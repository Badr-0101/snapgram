import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import PostState from './PostState';
import type { PostDocument } from '@/types';
type GridPostListProps = {
  posts: PostDocument[];
  showUser?: boolean;
  showStats?: boolean;
};
import placeHolder from '../../../../public/assets/icons/profile-placeholder.svg';
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80 mb-20">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={post.creator.imageUrl || placeHolder}
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostState post={post} userId={user.$id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
