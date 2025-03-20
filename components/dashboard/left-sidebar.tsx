"use client";
import {
  BarChart,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { useState } from "react";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[250px]">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r border-white bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};
export default LeftSidebar;

const DashboardSidebar = () => {
  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
          <span className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Blog
            </span>
            <span className="text-foreground">Byte</span>
          </span>
        </Link>
      </div>
      <nav>
        <Link href={"/dashboard"}>
          <Button className="w-full justify-start hover:bg-gradient-to-r from-purple-600 to-indigo-600 " variant={"ghost"}>
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Overview
          </Button>
        </Link>
        <Link href={"/articles"}>
          <Button className="w-full justify-start hover:bg-gradient-to-r from-purple-600 to-indigo-600" variant={"ghost"}>
            <FileText className="h-5 w-5 mr-2" />
            Articles
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button className="w-full justify-start hover:bg-gradient-to-r from-purple-600 to-indigo-600" variant={"ghost"}>
            <MessageCircle className="h-5 w-5 mr-2" />
            Comments
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button className="w-full justify-start hover:bg-gradient-to-r from-purple-600 to-indigo-600" variant={"ghost"}>
            <BarChart className="h-5 w-5 mr-2" />
            Analytics
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button className="w-full justify-start hover:bg-gradient-to-r from-purple-600 to-indigo-600" variant={"ghost"}>
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </Link>
      </nav>
    </div>
  );
};
