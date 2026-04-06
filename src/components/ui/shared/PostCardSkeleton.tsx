const PostCardSkeleton = () => {
  return (
    <div className="post-card w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-dark-4 skeleton-shimmer" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded-md bg-dark-4 skeleton-shimmer" />
            <div className="h-3 w-20 rounded-md bg-dark-4 skeleton-shimmer" />
          </div>
        </div>
        {/* Edit icon placeholder */}
        <div className="w-5 h-5 rounded bg-dark-4 skeleton-shimmer" />
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-2 py-4">
        <div className="h-4 w-3/4 rounded-md bg-dark-4 skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded-md bg-dark-4 skeleton-shimmer" />
        {/* Tags */}
        <div className="flex gap-2 mt-1">
          <div className="h-3 w-14 rounded-md bg-dark-4 skeleton-shimmer" />
          <div className="h-3 w-14 rounded-md bg-dark-4 skeleton-shimmer" />
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-64 rounded-2xl bg-dark-4 skeleton-shimmer" />

      {/* Actions */}
      <div className="flex items-center gap-6 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-dark-4 skeleton-shimmer" />
          <div className="h-3 w-6 rounded bg-dark-4 skeleton-shimmer" />
        </div>
        <div className="w-5 h-5 rounded bg-dark-4 skeleton-shimmer" />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
