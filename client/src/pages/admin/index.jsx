import { Navigate, Outlet, useLocation } from "react-router-dom";

import Footer from "../../components/Footer";
import AdminNavBar from "../../components/AdminNavbar";

function Admin() {
  const location = useLocation()
    .pathname.split("/")
    .filter((l) => l !== "");

  if (location[0] === "admin" && location.length === 1)
    return <Navigate to={"/admin/login"} />;

  return (
    <>
      <AdminNavBar />

      <Outlet />

      <Footer />
    </>
  );
}

export default Admin;
