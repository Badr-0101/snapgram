

import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import PostState from "./PostState";
import imgPlaceholder from "@/assets/icons/profile-placeholder.svg";
import type { IPost } from "@/types";

type GridPostListProps = {
  posts?: IPost[]  ;
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {posts?.map((post) => (
        <li
          key={post.$id}
          className="relative rounded-2xl overflow-hidden group aspect-square bg-dark-3 shadow-lg"
        >
          {/* Image */}
          <Link to={`/post/${post.$id}`} className="block w-full h-full">
            <img
              src={post.imageUrl}
              alt="post"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
         

          {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           </Link>
          {/* Footer info */}
          {(showUser || showStats) && (
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {showUser && (
                <div className="flex items-center gap-2">
                  <img
                    src={post.creator.imageUrl || imgPlaceholder}
                    alt={post.creator.name}
                    className="w-7 h-7 rounded-full ring-2 ring-white/30"
                  />
                  <p className="text-white text-sm font-medium line-clamp-1">
                    {post.creator.name}
                  </p>
                </div>
              )}
              {showStats && (
                <div className="mt-1">
                  <PostState post={post} userId={user.id} />
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;