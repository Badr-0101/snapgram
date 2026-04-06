
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/auth/form/signUpForm";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";

type SearchResultsProps = {
  isFetching: boolean;
  posts: any;
};

const SearchResults = ({ isFetching, posts }: SearchResultsProps) => {
  if (isFetching) return <Loader />;
  if (posts?.documents?.length > 0)
    return <GridPostList posts={posts.documents} />;
  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  // Infinite scroll: fetch next page when bottom sentinel is visible
  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const isSearching = searchValue !== "";
  const allPagesEmpty = posts.pages.every((p) => p.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        {/* Search Header */}
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-2 px-4 w-full rounded-lg bg-dark-4 items-center">
          <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent border-none focus:ring-0"
          />
        </div>
      </div>

      {/* Feed Header */}
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
      </div>

      {/* Posts Grid */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {isSearching ? (
          <SearchResults isFetching={isSearchFetching} posts={searchedPosts} />
        ) : allPagesEmpty ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
          ) : (
          posts.pages.map((page, i) => (
            <GridPostList key={`page-${i}`} posts={page.documents} />
          ))
        )}
      </div>

      {/* Infinite scroll sentinel */}
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;