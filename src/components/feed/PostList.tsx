'use client'

import { useEffect, useRef } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { PostCard } from './PostCard'
import { Post } from '@/services/posts'
import {PostSkeleton} from './PostSkeleton'

type PostListProps = {
  currentUsername: string | null
  onDeleteClick: (post: Post) => void
  onEditClick: (post: Post) => void
}

export function PostList({ currentUsername,
    // onDeleteClick,
    // onEditClick
}: PostListProps) {

    const { 
  data, 
  fetchNextPage, 
  hasNextPage, 
  isFetchingNextPage,
  status
} = usePosts();

  const bottomRef = useRef<HTMLDivElement>(null)

  // Infinite scroll via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (bottomRef.current) observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page.results) ?? []

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#CCCCCC] p-6 text-center text-gray-500">
        Failed to load posts. Please try again.
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#CCCCCC] p-6 text-center text-gray-500">
        No posts yet. Be the first to post!
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard
              key={post.id}
              post={post}
              currentUsername={currentUsername} onDelete={function (post: Post): void {
                  throw new Error('Function not implemented.')
              } } onEdit={function (post: Post): void {
                  throw new Error('Function not implemented.')
              } }        //   onDelete={onDeleteClick}
        //   onEdit={onEditClick}
        />
      ))}

      <div ref={bottomRef} className="py-2 flex justify-center">
        {isFetchingNextPage && (
          <span className="text-sm text-gray-400">Loading more...</span>
        )}
      </div>
    </div>
  )
}

