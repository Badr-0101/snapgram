import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants/index';
import logo from '../../../../public/assets/images/logo.svg';
import profilePlaceHolder from '../../../../public/assets/icons/profile-placeholder.svg';
import logout from '../../../../public/assets/icons/logout.svg';
const SideBar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar w-[244px] max-sm:hidden   h-screen p-4  ">
      <div className="flex flex-col gap-11 ">
        <Link to="/" className="flex  gap-3 items-center pt-6">
          <img src={logo} width={130} height={325} />
        </Link>

        <Link to={`/profile/${user.$id}`}>
          <div className="flex gap-2.5">
            <img
              src={user.imageUrl || profilePlaceHolder}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">{user.username}</p>
            </div>
          </div>
        </Link>
        <ul>
          {sidebarLinks.map((link, index) => {
            return (
              <NavLink to={link.route} key={index}>
                {({ isActive }) => (
                  <li
                    className={`flex gap-2.5 p-2.5 group hover:bg-primary-500 ${
                      isActive ? 'bg-primary-500' : ''
                    }`}
                  >
                    <img
                      src={link.imgURL}
                      className={`group-hover:invert-white ${
                        isActive ? 'invert-white' : ''
                      }`}
                    />
                    {link.label}
                  </li>
                )}
              </NavLink>
            );
          })}
        </ul>

        <Button
          variant="ghost"
          onClick={() => {
            signOut();
          }}
          className="shad-buton_ghost flex justify-start pl-2.5"
        >
          <img src={logout} alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default SideBar;
