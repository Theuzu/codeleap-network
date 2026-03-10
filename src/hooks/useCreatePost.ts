import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, CreatePostPayload } from '@/services/posts'

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}