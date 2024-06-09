import React from "react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "../utils/";

import logo from "../assets/greenhaul.png";

const UserNavbar = () => {
  const links = [
    {
      route: "/user/dashboard",
      title: "Dashboard",
    },
    {
      route: "/user/profile",
      title: "Profile",
    },
    {
      route: "/store",
      title: "Store",
    },
  ];

  return (
    <nav className="flex justify-between items-center px-8 h-16">
      <Link to="/">
        <img src={logo} alt="GreenHaul Logo" className="h-16" />
      </Link>

      <div className="flex gap-5 font-abril items-center">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.route}
            className={({ isActive }) =>
              cn(
                "text-primary-green font-bold text-xl hover-underline-animation",
                isActive ? "after:w-full" : ""
              ) + ""
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default UserNavbar;
