"use client";
import { CreatePostForm } from "@/components/feed/CreatePostForm";
import { PostList } from "@/components/feed/PostList";

import { Post } from "@/services/posts";
import { useUserStore } from "@/store/user";

export default function Feed() {
  const { username } = useUserStore();
  console.log("user", username);


  return (
    <div className="min-h-screen bg-muted flex justify-center flex-col items-center">
      <main className="w-full max-w-[800px] flex flex-col items-center bg-white min-h-screen">
        <div className="w-full bg-primary h-16 flex items-center px-8">
          <span className="text-white font-bold text-xl">CodeLeap Network</span>
        </div>

        <div className="w-full flex flex-col gap-6 py-6 px-4">
          <CreatePostForm />

          <PostList
            currentUsername={username} onDeleteClick={function (post: Post): void {
              throw new Error("Function not implemented.");
            } } onEditClick={function (post: Post): void {
              throw new Error("Function not implemented.");
            } }            // onDeleteClick={setPostToDelete}
            // onEditClick={setPostToEdit}
          />
        </div>
      </main>

      {/* <DeleteModal
        post={postToDelete}
        onClose={() => setPostToDelete(null)}
      /> */}

      {/* <EditModal
        post={postToEdit}
        onClose={() => setPostToEdit(null)}
      /> */}
    </div>
  );
}
