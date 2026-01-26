import PostForm from '@/components/ui/formcomponents/PostForm';
import React from 'react';

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className=" w-full flex-start gap-3 justify-start max-w-5xl ">
          <img
            src="/snapgram/public/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">create post</h2>
        </div>
        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
