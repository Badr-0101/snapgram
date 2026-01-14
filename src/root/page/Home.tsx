import Loader from '@/components/ui/shared/Loader';
import PostCard from '@/components/ui/shared/PostCard';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import type { Models } from 'appwrite';

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full ">Home Feeds</h2>
          {isPostLoading & posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col gap-12 mt-6">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="m-auto">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
