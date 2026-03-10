"use client";
import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { Header } from "@/components/feed/Header";
import { PostList } from "@/components/feed/PostList";
import { ScrollToTopButton } from "@/components/feed/ScrollToTopButton";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { EditModal } from "@/components/modals/EditModal";

import { Post } from "@/services/posts";
import { useUserStore } from "@/store/user";
import { useState } from "react";

export default function Feed() {
  const { username } = useUserStore();
  console.log("user", username);

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-muted flex justify-center flex-col items-center">
      <main className="w-full max-w-[800px] flex flex-col items-center bg-background min-h-screen">
        <Header />
        <ScrollToTopButton/>

        <div className="w-full flex flex-col gap-6 py-6 px-4">
          <CreatePostForm />

          <PostList
            currentUsername={username}
            onDeleteClick={setPostToDelete}
            onEditClick={setPostToEdit}
          />
        </div>
      </main>

      <DeleteModal post={postToDelete} onClose={() => setPostToDelete(null)} />

      <EditModal post={postToEdit} onClose={() => setPostToEdit(null)} />
    </div>
  );
}
