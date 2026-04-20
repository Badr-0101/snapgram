import {useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import type { IUser } from "@/types";

type UserCardProps = {
  user: IUser;
};

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  return (
    <div className="w-full max-w-sm m-auto flex items-center justify-between border border-dark-4 rounded-2xl bg-dark-2 p-4">
      <Link
        to={`/profile/${user?.$id}`}
        className=" "
      >
      
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt={user?.name}
            className="w-14 h-14 rounded-full object-cover border border-dark-4"
          />

          <div className="flex flex-col overflow-hidden">
            <p className="base-medium text-light-1 truncate">
              {user.name}
            </p>
            <p className="small-regular text-light-3 truncate">
              @{user.username}
            </p>
          </div>
        </div>
      </Link>

    
        <Button
          type="button"
          size="sm"
          className={`
            px-5 py-2
            rounded-full
            hover:scale-105 
            transition-transform
            cursor-pointer
            
          `}
        onClick={() => setIsFollowing(!isFollowing)} 
        style={{backgroundColor: isFollowing ? "#FF7425" : "#877EFF"}}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>

    </div>
  );
};

export default UserCard;
