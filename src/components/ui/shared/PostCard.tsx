import { Link } from "react-router-dom";
import { formatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostState from "./PostState";
import { type IPost } from "@/types";
import PostCardSkeleton from "./PostCardSkeleton";
import edit from '@/assets/icons/edit.svg'

type TPostCardProps = {
  post: IPost;
  isLoading?: boolean;
};

const PostCard = ({ post, isLoading = false }: TPostCardProps) => {
  const { user } = useUserContext();

  if (isLoading) return <PostCardSkeleton />;

  return (
    <article className="post-card w-full">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex-between mb-2">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`} className="shrink-0">
            <img
              src={post.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt={`${post.creator?.name ?? "creator"}'s avatar`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/30 transition-all hover:ring-primary-500"
            />
          </Link>

          <div className="flex flex-col">
            <Link
              to={`/profile/${post.creator.$id}`}
              className="base-medium text-light-1 hover:text-primary-500 transition-colors"
            >
              {post.creator?.name}
            </Link>
            <div className="flex items-center gap-2 text-light-3">
              <span className="subtle-semibold">{formatDateString(post.$createdAt)}</span>
              {post.location && (
                <>
                  <span className="text-light-4">·</span>
                  <span className="subtle-semibold truncate max-w-[120px]">{post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {user.id === post.creator.$id && (
          <Link
            to={`/update-post/${post.$id}`}
            aria-label="Edit post"
            className="p-1.5 rounded-lg hover:bg-dark-4 transition-colors"
          >
            <img src={edit} alt="edit" width={20} height={20} />
          </Link>
        )}  
      </header>

      {/* ── Body ───────────────────────────────────────────── */}
      <Link to={`/post/${post.$id}`} className="block group">
        <div className="small-medium lg:base-medium py-4">
          <p className="text-light-2 leading-relaxed">{post.caption}</p>
          {post.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mt-3">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-primary-500 text-xs font-medium">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
            className="post-card_img transition-transform duration-500 group-hover:scale-[1.02]"
            alt={post.imageAlt || "post image"}
            width={468}
            height={468}
            loading="lazy"
          />
        </div>
      </Link>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="mt-4">
        <PostState post={post} userId={user.id} />
      </footer>
    </article>
  );
};

export default PostCard;
