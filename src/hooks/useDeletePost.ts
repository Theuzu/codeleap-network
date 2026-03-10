/**
 * The useDeletePost function is a custom React Query hook that handles deleting a
 * post and updating the query cache accordingly.
 * @returns The `useDeletePost` custom hook is being returned. This hook uses
 * `useMutation` from `@tanstack/react-query` to handle the deletion of a post. It
 * cancels any ongoing queries for posts, updates the query data to remove the
 * deleted post, handles errors by reverting back to the previous data, and
 * invalidates the posts query after the deletion is settled.
 */
import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query'
import { deletePost, PaginatedResponse } from '@/services/posts'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),

    onMutate: async (id) => {
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
              results: page.results.filter((post: { id: number }) => post.id !== id),
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