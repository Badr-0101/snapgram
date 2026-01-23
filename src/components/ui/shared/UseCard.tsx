import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import type { IUser } from '@/types/index';
type UserCardProps = {
  user: IUser;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="w-full max-w-sm">
      <Link
        to={`/profile/${user.$id}`}
        className="flex items-center justify-between gap-4 
        rounded-2xl bg-dark-2 p-4 
        border border-dark-4
        transition-all duration-300 
        hover:bg-dark-3 hover:shadow-lg"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border border-dark-4"
          />

          <div className="flex flex-col overflow-hidden">
            <p className="base-medium text-light-1 truncate">{user.name}</p>
            <p className="small-regular text-light-3 truncate">
              @{user.username}
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="sm"
          className="
            shad-button_primary 
            px-5 py-2
            rounded-full
            hover:scale-105 
            transition-transform
          "
          onClick={(e) => e.preventDefault()}
        >
          Follow
        </Button>
      </Link>
    </div>
  );
};

export default UserCard;
