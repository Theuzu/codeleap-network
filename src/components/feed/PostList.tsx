/**
 * The above code defines a React component called `PostList` that displays a list
 * of posts with infinite scroll functionality and animations.
 * @property {string | null} currentUsername - The `currentUsername` property in
 * the `PostList` component is a string or `null` value that represents the
 * username of the current user. It is used to determine if the current user is the
 * author of a post and enable certain actions like editing or deleting the post.
 * @property onDeleteClick - The `onDeleteClick` property in the `PostList`
 * component is a function that takes a `Post` object as a parameter. This function
 * is called when a user clicks on a delete button associated with a specific post
 * in the list. The purpose of this function is to handle the deletion of the
 * @property onEditClick - The `onEditClick` property in the `PostList` component
 * is a function that is called when a user clicks on the edit button for a
 * specific post. It takes a `Post` object as a parameter, representing the post
 * that the user wants to edit.
 */
"use client";

import { useEffect, useRef } from "react";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "./PostCard";
import { Post } from "@/services/posts";
import { PostSkeleton } from "./PostSkeleton";
import { Card } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";

type PostListProps = {
  currentUsername: string | null;
  onDeleteClick: (post: Post) => void;
  onEditClick: (post: Post) => void;
};

export function PostList({
  currentUsername,
  onDeleteClick,
  onEditClick,
}: PostListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePosts();

  const bottomRef = useRef<HTMLDivElement>(null);

  // Infinite scroll via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.results) ?? [];

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <Card className="w-full bg-background rounded-2xl border p-6 text-center">
        Failed to load posts. Please try again.
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="w-full bg-background rounded-2xl border p-6 text-center">
        No posts yet. Be the first to post!
      </Card>
    );
  }

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <PostCard
              key={post.id}
              post={post}
              currentUsername={currentUsername}
              onDelete={onDeleteClick}
              onEdit={onEditClick}
            />
          </motion.div>
        ))}
        <div ref={bottomRef} className="py-2 flex justify-center">
          {isFetchingNextPage && (
            <span className="text-sm text-gray-400">Loading more...</span>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
