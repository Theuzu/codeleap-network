import { Trash2, SquarePen } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/services/posts";
import { Button } from "../ui/button";

type PostCardProps = {
  post: Post;
  currentUsername: string | null;
  onDelete: (post: Post) => void;
  onEdit: (post: Post) => void;
};

export function PostCard({
  post,
  currentUsername,
  onDelete,
  onEdit
}: PostCardProps) {
  const isOwner = post.username === currentUsername;

  return (
    <div className="w-full rounded-2xl border border-[#CCCCCC] overflow-hidden bg-white">

      {/* Header */}
      <div className="bg-primary px-5 py-4 flex items-center justify-between">
        <h2 className="text-white font-bold text-lg truncate pr-4">
          {post.title}
        </h2>

        {isOwner && (
          <div className="flex items-start w-fit h-fit shrink-0">
            <Button
              onClick={() => onDelete(post)}
              className="text-white hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Delete post"
            >
              <Trash2 size={25} /> 
              {/* This icon was the most similar one in lucide-react*/}
            </Button>
            <Button
                onClick={() => onEdit(post)}
              className="text-white hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Edit post"
            >
              <SquarePen size={25} />
            </Button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm">@{post.username}</span>
          <span className="text-gray-400 text-sm">
            {formatDistanceToNow(new Date(post.created_datetime), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm text-gray-800 leading-relaxed">{post.content}</p>
      </div>
    </div>
  );
}
