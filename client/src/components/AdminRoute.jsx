import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const authorized = localStorage.getItem("jwt");

  if (!!authorized)
    return (
      <>
        <Outlet />
      </>
    );

  return <Navigate to={"/admin/login"} />;
};

export default AdminRoute;
