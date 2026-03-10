import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { Post } from "@/services/posts";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import {
  postFormSchema,
  PostFormSchema,
} from "@/app/schemas/post-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type EditModalProps = {
  post: Post | null;
  onClose: () => void;
};

export function EditModal({ post, onClose }: EditModalProps) {
  const isOpen = !!post;
  const { mutate: updatePost, isPending } = useUpdatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
  });

  // Logic: Disable if the form is invalid, currently saving, or hasn't been changed
  const isDisabled = !isValid || !isDirty || isPending;

  useEffect(() => {
    if (post) {
      reset({ title: post.title, content: post.content });
    }
  }, [post, reset]);

  function onSubmit(payload: PostFormSchema) {
    if (!post) return;
    
    updatePost(
      {
        id: post.id,
        payload: { title: payload.title, content: payload.content },
      },
      { onSuccess: onClose },
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-base">Edit Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Title Field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-title" className="text-sm">Title</Label>
            <Input
              id="edit-title"
              placeholder="Hello world"
              className={cn(
                "border-[#CCCCCC] placeholder:text-gray-400",
                errors.title && "border-red-500"
              )}
              {...register("title")}
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title.message}</span>
            )}
          </div>

          {/* Content Field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-content" className="text-sm">Content</Label>
            <Textarea
              id="edit-content"
              placeholder="Content here"
              rows={4}
              className={cn(
                "border-[#CCCCCC] placeholder:text-gray-400 resize-none",
                errors.content && "border-red-500"
              )}
              {...register("content")}
            />
            {errors.content && (
              <span className="text-xs text-red-500">{errors.content.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="px-8 h-9 rounded-lg border-black text-black hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isDisabled}
              className={cn(
                "px-8 h-9 rounded-lg text-white text-sm font-semibold transition-all duration-200",
                !isDisabled
                  ? "bg-[#43A047] hover:bg-[#388E3C]"
                  : "bg-[#B0B0B0] cursor-not-allowed",
              )}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}