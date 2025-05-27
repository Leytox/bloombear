"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ThumbsDown, ThumbsUp, Trash2, Verified } from "lucide-react";
import { Comment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  deleteComment,
  unVerifyComment,
  verifyComment,
} from "@/actions/comments";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function CommentsTable({ comments }: { comments: Comment[] }) {
  const router = useRouter();

  async function handleVerifyComment(id: string) {
    try {
      if (comments.find((comment) => comment.id === id)?.verified) {
        await unVerifyComment({ id });
        toast.success("Comment unverified");
      } else {
        await verifyComment({ id });
        toast.success("Comment verified");
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to verify comment:", error);
      toast.error("Failed to verify comment");
    }
  }

  async function handleDeleteComment(id: string) {
    try {
      await deleteComment({ id });
      toast.success("Comment deleted");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment");
    }
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Recommended</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No comments found.
                </TableCell>
              </TableRow>
            ) : (
              comments?.map((message: Comment) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">{message.name}</TableCell>

                  <TableCell className="font-mono text-sm">
                    {message.email}
                  </TableCell>

                  <TableCell className="text-left" title={message.content}>
                    {message.content.length >= 20
                      ? message.content.substring(0, 20) + "..."
                      : message.content}
                  </TableCell>

                  <TableCell className="text-center">
                    {message.recommended ? <ThumbsUp /> : <ThumbsDown />}
                  </TableCell>

                  <TableCell className="text-right flex gap-2 justify-end">
                    <Link href={`/product/${message.productId}`}>
                      <Button variant="secondary" title="View Product">
                        <Search />
                      </Button>
                    </Link>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={message.verified ? "default" : "outline"}
                          size="icon"
                          title={
                            message.verified
                              ? "Unverify Comment"
                              : "Verify Comment"
                          }
                        >
                          <Verified />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {message.verified ? "Unverify" : "Verify"} Comment
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          Are you sure you want to{" "}
                          {message.verified ? "unverify" : "verify"} this
                          comment?
                        </DialogDescription>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant={message.verified ? "default" : "outline"}
                              onClick={() => handleVerifyComment(message.id)}
                            >
                              {message.verified ? "Unverify" : "Verify"}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          title="Delete Comment"
                        >
                          <Trash2 />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Comment</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          Are you sure you want to delete this comment?
                        </DialogDescription>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteComment(message.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
