import { Comment } from "@/generated/prisma";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">{comment.name}</div>
          <div className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {comment.recommended ? <ThumbsUp /> : <ThumbsDown />}
        </div>
      </div>
      <div className="text-sm text-gray-500">{comment.content}</div>
    </div>
  );
}
