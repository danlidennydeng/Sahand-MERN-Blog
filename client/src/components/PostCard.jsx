import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border h-[400px] overflow-hidden rounded-lg sm:w-[430px] border hover:border-purple-700">
      <img src={post.image} className="h-[260px] w-full object-cover" />

      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-1">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="border border-purple-700 hover:bg-purple-700 hover:text-white text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
