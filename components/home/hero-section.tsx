"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-900">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-500/30 before:to-indigo-500/30 before:blur-3xl" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 py-24 md:flex-row md:py-32">
        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            Explore the World Through
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}Words
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
            Discover insightful articles, thought-provoking stories, and expert
            perspectives on technology, lifestyle, and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button size="lg" className="rounded-full px-8 py-6 text-lg hover:bg-transition">
                Start Reading
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg border-gray-400 dark:text-white hover:bg- transition"
              >
                Explore Topics
              </Button>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 pt-8 md:max-w-md"
          >
            {[{ count: "1K+", label: "Published Articles" }, { count: "50+", label: "Expert Writers" }, { count: "10M+", label: "Monthly Readers" }].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl font-extrabold text-white">{stat.count}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex-1 md:mt-0 flex justify-center"
        >
          <div
            className={cn(
              "relative h-72 w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent",
              "border border-primary/20 backdrop-blur-lg",
              "shadow-2xl shadow-indigo-500/20"
            )}
          >
            <Image
              src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb2d8ZW58MHx8MHx8fDA%3D"
              alt="Illustration for the blog"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;