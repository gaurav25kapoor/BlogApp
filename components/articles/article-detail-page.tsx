import type { Prisma } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeButton from "./like-button";
import CommentList from "../comments/comment-list";
import CommentInput from "../comments/comment-input";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Card } from "../ui/card";
import { MessageCircle } from "lucide-react";

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({
  article,
}) => {
  const comments = await prisma.comment.findMany({
    where: { articleId: article.id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: { articleId: article.id },
  });

  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId as string },
  });

  const isLiked: boolean = likes.some((like) => like.userId === user?.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl bg-card shadow-md rounded-xl p-6 border border-border">
          {/* HEADER */}
          <header className="mb-10">
            <div className="flex justify-between items-center mb-4">
              {/* Article Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md">
                  {article.category}
                </span>
              </div>
              {/* Estimated Reading Time */}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                12 min to read
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl font-bold mb-4">
              {article.title || "How to Learn Web Development in 2025"}
            </h1>

            {/* Author Section */}
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article.author.imageUrl || ""} />
                <AvatarFallback className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                  {article.author.name ? article.author.name.charAt(0) : "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {article.createdAt ? article.createdAt.toDateString() : ""}
                </p>
              </div>
            </div>
          </header>

          {/* ARTICLE CONTENT */}
          <section className="text-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </section>

          {/* Like Button Section with a Single Solid Border */}
          <div className="py-6">
            <LikeButton
              articleId={article.id}
              likes={likes}
              isLiked={isLiked}
            />
          </div>

          {/* Comments Section - Clean Box with Good Border & Shadow */}
          <Card className="p-6  bg-card shadow-lg border border-gray-500 dark:border-gray-500 rounded-lg">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div>
            {/* Comment Form */}
            <CommentInput articleId={article.id} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
