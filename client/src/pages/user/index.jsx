import { Navigate, Outlet, useLocation } from "react-router-dom";

import Footer from "../../components/Footer";
import UserNavbar from "../../components/UserNavbar";

function User() {
  const location = useLocation()
    .pathname.split("/")
    .filter((l) => l !== "");

  if (location[0] === "user" && location.length === 1)
    return <Navigate to={"/User/login"} />;

  return (
    <>
      <UserNavbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default User;
