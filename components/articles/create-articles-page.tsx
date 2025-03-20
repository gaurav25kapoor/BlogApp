"use client";
import React, { FormEvent, startTransition, useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ClientOnlyEditor from "@/components/ClientOnlyEditor"; // Import the wrapper
import { createArticle } from "@/actions/create-article";

const CreateArticlesPage = () => {
  const [content, setContent] = useState("");
  const [formState, action, isPending] = useActionState(createArticle, {
    errors: {},
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content.trim());

    // Prevent submission if content is empty
    if (!content.trim()) {
      alert("Content cannot be empty!");
      return;
    }

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card className="bg-background text-foreground">
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Article Title */}
            <div className="space-y-2">
              <Label className="my-4">Article Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter an article title"
                className="bg-background text-foreground"
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm font-medium">
                  {formState.errors.title}
                </span>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background text-foreground px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all my-4"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm font-medium">
                  {formState.errors.category}
                </span>
              )}
            </div>

            {/* Featured Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
                className="my-4"
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-background text-foreground">
                <ClientOnlyEditor value={content} onChange={setContent} />
              </div>
              {formState.errors.content && (
                <span className="text-red-600 text-sm font-medium">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlesPage;
