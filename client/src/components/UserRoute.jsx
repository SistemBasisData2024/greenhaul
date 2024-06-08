import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const authorized = localStorage.getItem("jwt");

  if (!!authorized)
    return (
      <>
        <Outlet />
      </>
    );

  return <Navigate to={"/user/login"} />;
};

export default UserRoute;
