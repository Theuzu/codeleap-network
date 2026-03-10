'use client'

import { useForm } from 'react-hook-form'
import { useCreatePost } from '@/hooks/useCreatePost'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'
import { postFormSchema, PostFormSchema } from '@/app/schemas/post-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export function CreatePostForm() {
  const { username } = useUserStore()
  const { mutate: createPost, isPending } = useCreatePost()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
  });

  const isDisabled = !isValid || !isDirty || isPending;

  function onSubmit(payload: PostFormSchema) {
    if (!username) return

    createPost(
      {
        username,
        title: payload.title,
        content: payload.content,
      },
      { 
        onSuccess: () => reset()
      }
    )
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-[#CCCCCC] p-6">
      <h2 className="font-bold text-lg mb-6">What's on your mind?</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title" className="text-sm">Title</Label>
          <Input
            id="title"
            placeholder="Hello world"
            className={cn(
              "border-[#CCCCCC] h-10 px-3 text-sm placeholder:text-gray-500",
              errors.title && "border-red-500 focus-visible:ring-red-500"
            )}
            {...register('title')}
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="content" className="text-sm">Content</Label>
          <Textarea
            id="content"
            placeholder="Content here"
            rows={4}
            className={cn(
              "border-[#CCCCCC] placeholder:text-gray-400 resize-none",
              errors.content && "border-red-500 focus-visible:ring-red-500"
            )}
            {...register('content')}
          />
          {errors.content && (
            <span className="text-xs text-red-500">{errors.content.message}</span>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isDisabled}
            className={cn(
              'px-8 h-9 rounded-lg text-sm font-semibold transition-all duration-200',
              !isDisabled
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'bg-[#B0B0B0] text-white cursor-not-allowed'
            )}
          >
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  )
}