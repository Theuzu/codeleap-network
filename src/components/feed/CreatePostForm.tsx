'use client'

// import { useForm, FieldValues } from 'react-hook-form'
// import { useCreatePost } from '@/hooks/useCreatePost'
// import { useUserStore } from '@/store/useUserStore'
import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'

export function CreatePostForm() {
//   const { username } = useUserStore()
//   const { mutate: createPost, isPending } = useCreatePost()

//   const { register, handleSubmit, watch, reset } = useForm()

//   const title = watch('title', '')
//   const content = watch('content', '')
//   const isDisabled = !title.trim() || !content.trim() || isPending

//   function onSubmit(payload: FieldValues) {
//     if (!username) return

//     createPost(
//       {
//         username,
//         title: payload.title,
//         content: payload.content,
//       },
//       { onSuccess: () => reset() }
//     )
//   }

  return (
    <div className="w-full bg-white rounded-2xl border border-[#CCCCCC] p-6">
      <h2 className="font-bold text-lg mb-6">What's on your mind?</h2>

      <form
    //   onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title" className="text-sm">Title</Label>
          <Input
            id="title"
            placeholder="Hello world"
            className="border-[#CCCCCC] placeholder:text-gray-400"
            // {...register('title')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="content" className="text-sm">Content</Label>
          <Textarea
            id="content"
            placeholder="Content here"
            rows={4}
            className="border-[#CCCCCC] placeholder:text-gray-400 resize-none"
            // {...register('content')}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            // disabled={isDisabled}
            className={cn(
              'px-8 h-9 rounded-lg text-sm font-semibold transition-all duration-200',
            //   !isDisabled
            //     ? 'bg-[#7695EC] hover:bg-[#5a7de8] text-white'
            //     : 'bg-[#B0B0B0] text-white cursor-not-allowed'
            )}
          >
            {/* {isPending ? 'Creating...' : 'Create'} */}
          </Button>
        </div>
      </form>
    </div>
  )
}