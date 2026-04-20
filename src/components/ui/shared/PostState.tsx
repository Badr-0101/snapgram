import React, { useMemo, useState } from "react";
import { useLikePost, useSavePost, useDeleteSavedPost, useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { type IPost } from "@/types";
import like from "@/assets/icons/like.svg"
import liked from "@/assets/icons/liked.svg"
import save from "@/assets/icons/save.svg"
import saved from "@/assets/icons/saved.svg"
type TpostProps = {
  post: IPost;
  userId: string;
};

const PostState = ({ post, userId }: TpostProps) => {

  // Derive initial likes from post.likes (already string[]) — avoids useEffect+setState cascade
  const initialLikes = useMemo(() => post.likes || [], [post.likes]);
  const [likes, setLikes] = useState<string[]>(initialLikes);
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

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    await likePost({ postId: post.$id, likesArray: newLikes });
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
      console.error("Failed to save/delete post", error);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5 mt-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? liked
              : like
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
              ? saved
              : save
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