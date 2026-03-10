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