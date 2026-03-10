'use client'

import { useDeletePost } from '@/hooks/useDeletePost'
import { Post } from '@/services/posts'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteModalProps = {
  post: Post | null
  onClose: () => void
}

export function DeleteModal({ post, onClose }: DeleteModalProps) {
  const { mutate: deletePost, isPending } = useDeletePost()

  const isOpen = !!post;

  function handleConfirm() {
    deletePost(post!.id, { onSuccess: onClose })
  }

  return (
    // Backdrop
    <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-bold text-base">
                Are you sure you want to delete this item?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex justify-end gap-3">
              <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}
              variant={"destructive"}>
                {isPending ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </div>
        </AlertDialogContent>
    </AlertDialog>
  )
}