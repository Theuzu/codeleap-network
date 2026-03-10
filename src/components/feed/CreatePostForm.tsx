"use client";

import { useCreatePost } from "@/hooks/useCreatePost";
import { useUserStore } from "@/store/user";
import { PostFormSchema } from "@/app/schemas/post-schema";
import { Card, CardContent, CardTitle } from "../ui/card";
import { PostForm } from "./PostForm";

export function CreatePostForm() {
  const { username } = useUserStore();
  const { mutate: createPost, isPending } = useCreatePost();

  function onSubmit(payload: PostFormSchema) {
    if (!username) return;
    createPost(
      { username, ...payload },
      { onSuccess: () => {} }, //reset throught props
    );
  }

  return (
    <Card className="w-full rounded-2xl border p-6">
      <CardTitle className="font-bold text-lg mb-6">
        What's on your mind?
      </CardTitle>
      <CardContent>
        <PostForm
          onSubmit={onSubmit}
          isPending={isPending}
          submitLabel="Create"
          pendingLabel="Creating..."
        />
      </CardContent>
    </Card>
  );
}
