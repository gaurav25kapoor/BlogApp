"use client";
import React, { FormEvent, startTransition, useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ClientOnlyEditor from "@/components/ClientOnlyEditor"; // Import the wrapper
import type { Articles } from "@prisma/client";
import { editArticle } from "@/actions/edit-article";



type EditArticleProps={
  article:Articles
}
const EditArticlePage: React.FC<EditArticleProps> = ({article}) => {
  const [content, setContent] = useState(article.content);
  const [formState, action, isPending] = useActionState(editArticle.bind(null,article.id), {
    errors: {},
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    // Wrap the action call in startTransition
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="my-4">Article Title</Label>
              <Input
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Enter an article title"
              />
              {formState.errors.title && <span className="text-red-600 text-sm font-medium">{formState.errors.title}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all my-4" name="category" defaultValue={article.category}
              >
                <option value="" className="bg-white dark:bg-gray-800">
                  Select Category
                </option>
                <option
                  value="technology"
                  className="bg-white dark:bg-gray-800"
                >
                  Technology
                </option>
                <option
                  value="programming"
                  className="bg-white dark:bg-gray-800"
                >
                  Programming
                </option>
                <option
                  value="web-development"
                  className="bg-white dark:bg-gray-800"
                >
                  Web Development
                </option>
              </select>
              {formState.errors.category && <span className="text-red-600 text-sm font-medium">{formState.errors.category}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
                className="my-4"
              />
              <div className="mb-4">
                {
                  article.featuredImage && (<img src={article.featuredImage} alt="" className="w-48 h-32 object-cover rounded-md" />)
                }
              
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <ClientOnlyEditor value={content} onChange={setContent} />
              {formState.errors.content && <span className="text-red-600 text-sm font-medium">{formState.errors.content[0]}</span>}
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {
                  isPending?"Loading...":"Edit Article"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
