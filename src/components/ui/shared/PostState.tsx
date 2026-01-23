import React, { useState } from 'react';
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetSavedPosts,
} from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import type { PostDocument } from '@/types/index';

type TpostProps = {
  post: PostDocument;
  userId: string;
};

const PostState = ({ post, userId }: TpostProps) => {
  const [likes, setLikes] = useState(post.likes ?? []);

  const { data: savedPostsData } = useGetSavedPosts(userId);
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavedPost } = useDeleteSavedPost();

  const savedPosts = savedPostsData?.documents || [];
  const savedPostRecord = savedPosts.find(
    (record) => record.post.$id === post.$id
  );
  const isSaved = !!savedPostRecord;

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const hasLiked = likes.includes(userId);
    let newLikes: string[];

    if (hasLiked) {
      newLikes = likes.filter((id) => id !== userId);
    } else {
      newLikes = [...likes, userId];
    }

    setLikes(newLikes);

    try {
      await likePost({ postId: post.$id, likesArray: newLikes });
    } catch (error) {
      setLikes(likes);
      console.error(error);
    }
  };

  const handleSavePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isSaved) {
        await deleteSavedPost({ savedRecordId: savedPostRecord.$id, userId });
      } else {
        await savePost({ userId, postId: post.$id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5 mt-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? '/public/assets/icons/liked.svg'
              : '/public/assets/icons/like.svg'
          }
          alt="like icon"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p>{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-5 mt-5">
        <img
          src={
            isSaved
              ? '/public/assets/icons/saved.svg'
              : '/public/assets/icons/save.svg'
          }
          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
};

export default PostState;
