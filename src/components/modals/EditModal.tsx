import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdatePost } from "@/hooks/useUpdatePost";
import { Post } from "@/services/posts";

import {
  PostFormSchema,
} from "@/app/schemas/post-schema";
import { PostForm } from "../feed/postForm";

type EditModalProps = {
  post: Post | null;
  onClose: () => void;
};

export function EditModal({ post, onClose }: EditModalProps) {
  const { mutate: updatePost, isPending } = useUpdatePost();

  function onSubmit(payload: PostFormSchema) {
    if (!post) return;
    updatePost(
      { id: post.id, payload },
      { onSuccess: onClose }
    );
  }

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-base">Edit Item</DialogTitle>
        </DialogHeader>
        
        <PostForm
          initialData={post ? { title: post.title, content: post.content } : undefined}
          onSubmit={onSubmit}
          onCancel={onClose}
          isPending={isPending}
          submitLabel="Save"
          pendingLabel="Saving..."
        />
      </DialogContent>
    </Dialog>
  );
}