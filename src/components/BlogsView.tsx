import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { MessageSquare, Share2, ThumbsUp, TriangleAlert } from "lucide-react";
import type { Blog } from "../types/blog";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const getBlogs = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/blogs`
  );
  return response.data;
}
const getBlogById = async (id: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
  );
  return response.data;
};

function BlogsView() {
  const blogQuery = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 5 * 60 * 1000 // data become stale after 5 minutes
  });
  const [showBlogsMobile, setShowBlogsMobile] = useState(true);
  const [currentBlogId, setCurrentBlogId] = useState<string>();
  if (blogQuery.isLoading) {
    return <div className="w-full min-h-150 flex px-8 py-4 gap-4 bg-neutral-200">
      <div className="w-full md:w-1/3">
        <p className="flex gap-1 items-center font-semibold">Loading Blogs</p>
        <div className="flex flex-col gap-1">
          {Array.from({ length: 6 }).map((_, idx) => <BlogCardSkeleton key={idx} />)}
        </div>
      </div>
      <div className="hidden md:block w-2/3">
        <BlogDetailSkeleton showBlogsMobile={true} />
      </div>
    </div>
  }
  if (blogQuery.isError) {
    return <div className="w-full min-h-130 flex px-8 py-4 gap-4 bg-neutral-200">
      <div className="flex flex-col gap-5 items-center w-full">
        <div className="text-red-500"><TriangleAlert size={60} /></div>
        <p className="flex gap-1 text-lg sm:text-xl md:text-2xl font-semibold text-red-500">Error : {blogQuery.error.message}</p>
        <div className="text-base md:text-xl">Please try again after sometime.</div>
      </div>
    </div>
  }
  const finalCurrentBlockId = currentBlogId ?? (blogQuery.isFetched && (blogQuery.data ?? []).length > 0 ? blogQuery.data?.at(0)?.id : undefined);
  return (
    <div className={`flex ${showBlogsMobile === false && "flex-col md:flex-row"} w-full min-h-150 px-2 md:px-8 py-4 gap-2 sm:gap-4 bg-neutral-200`}>
      {showBlogsMobile === false && <div className="text-lg font-semibold md:hidden underline hover:text-blue-500 transition-colors cursor-pointer" onClick={() => setShowBlogsMobile(true)}>Go Back</div>}
      {showBlogsMobile ? <div className="flex w-full md:w-1/3 flex-col gap-4">
        <p className="font-semibold">Latest Blogs</p>
        <div className="flex flex-col gap-1">
          {blogQuery.isFetched && blogQuery.data?.map((blog) => <div key={blog.id}
            className={`transition-all duration-200 flex flex-col gap-1 p-2 sm:p-4 border border-neutral-300 bg-white rounded-md ${finalCurrentBlockId === blog.id && "border-l-4 border-l-blue-500"}`}
            onClick={() => { setCurrentBlogId(blog.id); setShowBlogsMobile(false) }}
          >
            <p className="w-full flex justify-between text-xs">
              <span className="text-blue-600">{blog.category.join(", ")}</span>
              <span>{formatDistanceToNow(new Date(blog.date), { includeSeconds: false, addSuffix: true })}</span>
            </p>
            <p className="font-bold">{blog.title}</p>
            <p className="opacity-80 line-clamp-2">{blog.description}</p>
          </div>)}
        </div>
      </div> : <div className="hidden md:flex w-1/3 flex-col gap-4">
        <p className="font-semibold">Latest Blogs</p>
        <div className="flex flex-col gap-1">
          {blogQuery.isFetched && blogQuery.data?.map((blog) => <div key={blog.id}
            className={`transition-all duration-200 flex flex-col gap-1 p-2 sm:p-4 border border-neutral-300 bg-white rounded-md ${finalCurrentBlockId === blog.id && "border-l-4 border-l-blue-500"}`}
            onClick={() => { setCurrentBlogId(blog.id); setShowBlogsMobile(false) }}
          >
            <p className="w-full flex flex-col md:flex-row justify-between text-xs"><span className="text-blue-600">{blog.category.join(", ")}</span><span>{formatDistanceToNow(new Date(blog.date), { includeSeconds: false, addSuffix: true })}</span></p>
            <p className="font-bold">{blog.title}</p>
            <p className="opacity-80 line-clamp-2">{blog.description}</p>
          </div>)}
        </div>
      </div>}
      <BlogDetail currentBlogId={finalCurrentBlockId} showBlogsMobile={showBlogsMobile} />
    </div>
  )
}

function BlogDetail({ currentBlogId, showBlogsMobile }: { currentBlogId?: string, showBlogsMobile?: boolean }) {
  const blogDetailQuery = useQuery<Blog>({
    queryKey: ["blog", currentBlogId],
    queryFn: () => getBlogById(currentBlogId!),
    enabled: !!currentBlogId,
    staleTime: 5 * 60 * 1000 // data become stale after 5 minutes
  });
  if (!blogDetailQuery.data) {
    if (blogDetailQuery.isLoading) {
      return <div className="w-full sm:w-2/3 bg-white rounded-md">
        Loading
      </div>
    }
    if (blogDetailQuery.isError) {
      return <div className="w-full sm:w-2/3 bg-white rounded-md">
        Error
      </div>
    }
    else {
      return <div className="w-full sm:w-2/3 bg-white rounded-md">
        Something unexpected happenend. Please refresh the page!
      </div>
    }
  }
  return <div className={`${showBlogsMobile && "hidden md:block"} w-full sm:w-2/3 h-fit bg-white rounded-md`}>
    <img src={blogDetailQuery.data.coverImage} alt={blogDetailQuery.data.title + " image"} className="object-cover h-82 w-full rounded-md" />
    <div className="p-4 flex flex-col gap-4">
      <p className="w-full flex flex-col sm:flex-row gap-2 opacity-70">
        <span className="text-blue-600">{blogDetailQuery.data.category.join(", ")}</span>
        <span className="hidden sm:block">•</span>
        <span>{formatDistanceToNow(new Date(blogDetailQuery.data.date), { includeSeconds: false, addSuffix: true })}</span>
      </p>
      <p className="text-2xl md:text-4xl font-bold">{blogDetailQuery.data.title}</p>
      <Button className="flex gap-2 items-center w-50 bg-blue-600 hover:bg-blue-700 hover:scale-105"><Share2 /> Share Blog</Button>
      <p className="opacity-90 text-base md:text-lg">{blogDetailQuery.data.content}</p>
    </div>
    <hr />
    <div className="flex justify-between items-center px-2 sm:px-4 md:px-8 py-8">
      <div className="flex items-center gap-2">
        <img src="https://placehold.co/50" alt="user avatar" className="rounded-full" />
        <div><p className="font-bold">Written by Arjun Mehta</p>
          <p className="opacity-80">Senior Finanical Analyst</p></div>
      </div>
      <div className="flex gap-2 sm:gap-4">
        <ThumbsUp className="text-blue-500 opacity-80 hover:scale-105" />
        <MessageSquare className="text-blue-500 opacity-80 hover:scale-105" />
      </div>
    </div>
  </div>
}

function BlogDetailSkeleton({
  showBlogsMobile,
}: {
  showBlogsMobile?: boolean;
}) {
  return (
    <div
      className={`${showBlogsMobile && "hidden md:block"} w-full h-fit bg-white rounded-md`}
    >
      {/* Cover Image */}
      <Skeleton className="h-82 w-full rounded-md" />

      <div className="p-4 flex flex-col gap-4">
        {/* Category + Date */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40 hidden sm:block" />
        </div>

        {/* Title */}
        <Skeleton className="h-8 md:h-12 w-4/5" />

        {/* Share Button */}
        <Skeleton className="h-10 w-40 rounded-md" />

        {/* Content (paragraph lines) */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
      </div>

      <Skeleton className="h-px w-full" />

      {/* Author Footer */}
      <div className="flex justify-between items-center px-2 sm:px-4 md:px-8 py-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div
      className="flex flex-col gap-1 p-2 sm:p-4 border border-neutral-300 bg-white rounded-md"
    >
      {/* Category + time */}
      <div className="w-full flex justify-between">
        <Skeleton className="h-3 w-24" /> {/* category */}
        <Skeleton className="h-3 w-20" /> {/* time */}
      </div>

      {/* Title */}
      <Skeleton className="h-4 w-3/4 mt-1" />

      {/* Description (2 lines) */}
      <Skeleton className="h-3 w-full mt-1" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
}

export default BlogsView
