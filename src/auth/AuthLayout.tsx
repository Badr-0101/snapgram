import { Outlet, Navigate } from 'react-router-dom';
import sideImg from '../../public/assets/images/side-img.svg';
const AuthLayout = () => {
  const isAuth = true;

  if (isAuth) {
    return (
      <div className="flex">
        <section className="flex flex-1 h-screen justify-center items-center flex-col ">
          <Outlet />
        </section>
        <img
          src={sideImg}
          className={
            'hidden h-screen  xl:block w-1/2 object-cover bg-no-repeat'
          }
        />
      </div>
    );
  } else {
    <Navigate to="/"></Navigate>;
  }
};

export default AuthLayout;
