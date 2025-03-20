"use client"

import React, { useOptimistic, useTransition } from "react";
import { Button } from "../ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { likeDislikeToggle } from "@/actions/like-article";
import { Like } from "@prisma/client";


type LikeButtonProps={
  articleId:string,
  likes:Like[];
  isLiked:boolean
}
const LikeButton :React.FC<LikeButtonProps>= ({articleId,likes,isLiked}) => {

  const [optimistcLike,setOptimisticLike]=useOptimistic(likes.length);
  const [isPending,startTransition]=useTransition();

  const handleLikeDislike=async()=>{
    startTransition(async()=>{
      setOptimisticLike(isLiked?optimistcLike-1:optimistcLike+1)
      await likeDislikeToggle(articleId);
    })
  }
  return (
    <div className="flex gap-4 mb-12 border-t border-black dark:border-white pt-8">
      <form action={handleLikeDislike}>
        <Button disabled={isPending} type="submit" className="gap-2" variant={"ghost"}>
          <ThumbsUp className="h-5 w-5" />{optimistcLike}
        </Button>
      </form>

      <Button className="gap-2" variant={"ghost"}>
        <Bookmark className="h-5 w-5" />
      </Button>
      <Button className="gap-2" variant={"ghost"}>
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default LikeButton;
