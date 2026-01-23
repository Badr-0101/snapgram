import { Link } from 'react-router-dom';
import { formatDateString } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';
import PostState from './PostState';
import type { PostDocument } from '@/types';
type tpostCardProps = {
  post: PostDocument;
};

const PostCard = ({ post }: tpostCardProps) => {
  const { user } = useUserContext();
  console.log(post);
  return (
    <div className="post-card w-fit">
      <div className="flex-betwen">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 ">
            <Link to={`/profile/${post.creator?.$id}`}>
              <img
                src={
                  post.creator?.imageUrl ||
                  '/assets/icons/profile-placeholder.svg'
                }
                alt="creator"
                className="w-12 lg:h-12 rounded-full"
              />
            </Link>
            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-1">
                {formatDateString(post.$createdAt)}
              </p>
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>

          <Link
            to={`/update-post/${post.$id}`}
            className={`${user.$id !== post.creator.$id ? 'hidden' : ''}`}
          >
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>

      <Link to={`/post/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post?.imageUrl || '/public/assets/icons/profile-placeholder.svg'}
          className="post-card_img"
          alt="post image"
          width={468}
          height={468}
        />
      </Link>

      <PostState post={post} userId={user.$id} />
    </div>
  );
};

export default PostCard;
