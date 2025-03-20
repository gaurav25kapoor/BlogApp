import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Clock, FileText, MessageCircle, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./recent-articles";
import { prisma } from "@/lib/prisma";

const BlogDashboard = async () => {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        comments: true,
        author: {
          select: { name: true, email: true, imageUrl: true },
        },
      },
    }),
    prisma.comment.count(),
  ]);

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bold text-2xl text-gray-900 dark:text-white">Blog Dashboard</h1>
          <p className="text-gray-700 dark:text-gray-300">Manage your content and analytics</p>
        </div>
        <Link href="/dashboard/articles/create">
          <Button>
            <PlusCircle className="h-5 w-5" />
            New Article
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[ 
          { title: "Total Articles", count: articles.length, subtitle: "+5 from last month", icon: <FileText className="h-6 w-6 text-blue-500" /> },
          { title: "Total Comments", count: totalComments, subtitle: "12 awaiting moderation", icon: <MessageCircle className="h-6 w-6 text-green-500" /> },
          { title: "Avg. Reading Time", count: "4.2m", subtitle: "+0.8m from last month", icon: <Clock className="h-6 w-6 text-yellow-500" /> }
        ].map(({ title, count, subtitle, icon }, index) => (
          <Card key={index} className="shadow-lg rounded-2xl p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:shadow-violet-400 hover:shadow-xl transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{count}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <RecentArticles articles={articles}/>
    </main>
  );
};

export default BlogDashboard;
