import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/ui/shared/Loader";
import GridPostList from "@/components/ui/shared/GridPostList";
import type { ISavedPost } from "@/types";
const Saved = () => {
  const { user } = useUserContext();
  const { data: savedPosts, isPending: isLoading } = useGetSavedPosts(user?.id);

  if (isLoading) return <Loader />;

  const posts = savedPosts?.documents.map(
    (saved: ISavedPost) => saved.post
  ) ?? [];

  return (
    <div className="saved-container">
      <h2 className="h3-bold md:h2-bold w-full">Saved Posts</h2>

      {posts.length === 0 ? (
        <p className="text-light-4 mt-10 text-center w-full">No saved posts yet</p>
      ) : (
        <GridPostList posts={posts} showStats={false} />
      )}
    </div>
  );
};

export default Saved;