import { useUserContext } from '@/context/AuthContext';
import { useGetSavedPosts } from '@/lib/react-query/queriesAndMutations';
import Loader from '@/components/ui/shared/Loader';
import GridPostList from '@/components/ui/shared/GridPostList';
const Saved = () => {
  const { user } = useUserContext();
  const { data: userSavedPost } = useGetSavedPosts(user?.$id);
  const showSavedPost = userSavedPost?.documents.map((el, idx) => (
    <GridPostList key={idx} posts={Array(el.post)} />
  ));
  if (!useGetSavedPosts) {
    return <Loader />;
  }
  return <div>{showSavedPost}</div>;
};

export default Saved;
