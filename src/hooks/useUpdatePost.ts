/**
 * The `useUpdatePost` function is a custom React Query hook in TypeScript that
 * handles updating a post and managing the cache accordingly.
 * @returns The `useUpdatePost` custom hook is being returned. This hook utilizes
 * `useMutation` from `@tanstack/react-query` to handle updating a post. It
 * includes mutation function, onMutate, onError, and onSettled callbacks to manage
 * the update process and handle any errors that may occur.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost, UpdatePostPayload, PaginatedResponse } from '@/services/posts'
import { InfiniteData } from '@tanstack/react-query'

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      updatePost(id, payload),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previous = queryClient.getQueryData(['posts'])

      queryClient.setQueryData<InfiniteData<PaginatedResponse>>(
        ['posts'],
        (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: page.results.map((post) =>
                post.id === id ? { ...post, ...payload } : post
              ),
            })),
          }
        }
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['posts'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}