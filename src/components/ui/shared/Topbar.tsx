import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
const Topbar = () => {
  const navigate = useNavigate();

  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="mt-2.5  hidden max-sm:block ">
      <div className=" topbar flex-between py-4 px-5 ">
        <Link to="/">
          <img
            src="/snapgram/public/assets/images/logo.svg"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => {
              signOut();
            }}
            className="shad-buton_ghost"
          >
            <img src="/snapgram/public/assets/icons/logout.svg" alt="logout" />
          </Button>

          <Link to={`/profile/${user.$id}`}>
            <img
              src={
                user.imageUrl ||
                '/snapgram/assets/icons/profile-placeholder.svg'
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
