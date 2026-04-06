import { useParams, Link } from "react-router-dom";
import { useGetUserById, useGetUserPosts } from "@/lib/react-query/queriesAndMutations";
import GridPostList from "@/components/ui/shared/GridPostList";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/ui/shared/Loader";

const UserProfile = () => {
    const { id } = useParams();
    const { user: currentUser } = useUserContext();
    const { data: user, isLoading } = useGetUserById(id as string);
    const { data: posts, isLoading: isPostLoading } = useGetUserPosts(id as string);

    if (isLoading || isPostLoading) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex-center w-full h-full">
                <p className="base-medium text-light-2">User not found</p>
            </div>
        );
    }

    return (
        <div className="profile-container w-full max-w-5xl mx-auto px-5 md:px-20 py-10">
            {/* Header section */}
            <div className="profile-inner_container flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
                <img 
                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                    alt="profile" 
                    className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover border border-dark-4 shadow-xl" 
                />
                
                <div className="flex flex-col flex-1 items-center md:items-start w-full">
                    <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 w-full mb-4">
                        <div className="flex flex-col items-center md:items-start">
                            <h1 className="h1-semibold md:h2-bold w-full text-center md:text-left text-light-1">
                                {user.name}
                            </h1>
                            <p className="small-regular md:body-medium text-light-3 text-center md:text-left">
                                @{user.username}
                            </p>
                        </div>

   
                    </div>

                    <div className="flex items-center gap-8 mt-5 z-20">
                        <div className="flex-center gap-2">
                            <p className="primary-text-gradient body-bold md:h3-bold">{posts?.documents?.length || 0}</p>
                            <p className="small-medium text-light-2">Posts</p>
                        </div>
                    </div>

                    {user.bio && (
                        <p className="base-medium text-light-2 mt-7 max-w-lg text-center md:text-left">
                            {user.bio}
                        </p>
                    )}
                </div>
            </div>

            <hr className="border border-dark-4 w-full mt-10 mb-8" />

            {/* Posts Grid Layout */}
            <div className="flex w-full mb-6 max-w-5xl">
                <h3 className="body-bold md:h3-bold w-full text-light-1">Posts</h3>
            </div>

            <div className="flex w-full justify-center">
                {posts?.documents?.length === 0 ? (
                    <p className="text-light-4 mt-10 w-full text-center">No posts to display</p>
                ) : (
                    <GridPostList posts={posts?.documents} showUser={false} showStats={true} />
                )}
            </div>
        </div>
    );
};

export default UserProfile;
