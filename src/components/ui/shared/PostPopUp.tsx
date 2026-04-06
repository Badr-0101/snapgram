
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import { Button } from "../button";

const PostPopUp = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { data: post,isLoading } = useGetPostById(params.id || ''   )
  if (isLoading) return <Loader />;

    return (
        <div className="w-full h-full">
            <Button
                onClick={() => navigate(-1)}
                variant='ghost'
                className="shad-button_ghost cursor-pointer">
                <p className="small-medium lg:base-medium">Close</p>
            </Button>
        {Array(post).map((post:any) => (
        <div className="flex items-center justify-center p-4 w-full h-full">
        <div className="bg-dark-2 border border-dark-4 rounded-3xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden max-h-[90vh]">
            
            {/* LEFT: Post Image */}
            <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[480px]">
            <img
                src={post.imageUrl}
                alt={post.imageAlt || "post image"}
                className="h-full w-full object-cover"
            />
            </div>

            {/* RIGHT: Info Panel */}
            <div className="w-full md:w-[400px] flex flex-col bg-dark-2">
            
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-dark-4">
                <Link to={`/profile/${post.creator.$id}`}>
                <img
                    src={post.creator.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="creator"
                    className="w-10 h-10 rounded-full object-cover"
                />
                </Link>

                <div className="flex flex-col flex-1">
                <Link to={`/profile/${post.creator.$id}`}>
                    <p className="base-medium text-light-1">{post.creator.name}</p>
                </Link>
                <p className="subtle-semibold text-light-3">{post.location}</p>
                </div>
                
                {/* Optional: More button/Delete button logic would go here */}
            </div>

            {/* Content (Caption + Tags) */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                    <p className="base-medium text-light-1">{post.creator.username}</p>
                    <p className="small-medium lg:base-medium text-light-2">{post.caption}</p>
                </div>
                
                <ul className="flex gap-1 flex-wrap">
                    {post.tags.map((tag: string, index: number) => (
                    <li key={`${tag}${index}`} className="text-primary-500 small-regular">
                        #{tag}
                    </li>
                    ))}
                </ul>
                </div>
                
                <p className="text-[10px] text-light-4 mt-4 uppercase">
                    {/* Simplified time format logic */}
                    {new Date(post.$createdAt).toLocaleDateString()}
                </p>
            </div>


            </div>
        </div>
        </div>
                ))}
            
     </div>
    )
};

export default PostPopUp;