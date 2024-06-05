import React from "react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "../utils/";

import logo from "../assets/greenhaul.png";

const NavBar = () => {
  const links = [
    {
      route: "/store",
      title: "Store",
    },
    {
      route: "/login",
      title: "Login",
    },
    {
      route: "/register",
      title: "Contribute Now!",
    },
  ];

  return (
    <nav className="flex justify-between items-center px-8 h-16">
      <div className="flex-1"></div> {/* Empty div for balancing the logo center */}
      <Link to="/" className="flex-1 flex justify-center">
        <img src={logo} alt="GreenHaul Logo" className="h-16" />
      </Link>
      <div className="flex-1 flex justify-end gap-10"> {/* Increased gap between links */}
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.route}
            className={({ isActive }) =>
              cn(
                !link.route.includes("contribute")
                  ? "text-primary-green font-bold text-xl hover-underline-animation"
                  : "text-header",
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

export default NavBar;
