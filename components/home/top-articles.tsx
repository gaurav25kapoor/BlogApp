import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";



const TopArticles = async () => {
  const articles = await prisma.articles.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((article) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg hover:shadow-2xl hover:shadow-violet-400 dark:hover:shadow-2xl dark:hover:shadow-violet-400"
          )}
        >
          <div className="p-6">
            <Link href={`/articles/${article.id}`}>
              
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg">
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

             
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  {article.author.imageUrl ? (
                    <AvatarImage src={article.author.imageUrl} />
                  ) : (
                    <AvatarFallback>{article.author?.name?.charAt(0) || "?"}</AvatarFallback>
                  )}
                </Avatar>
                
                <span>{article.author?.name || "Unknown author"}</span>
              </div>

              
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{article.category}</p>

              
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toDateString()}</span>
                <span>12 min read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TopArticles;
