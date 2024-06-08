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
      route: "/user/register",
      title: "Contribute Now!",
    },
  ];

  return (
    <nav className="flex justify-between items-center px-8 h-16 z-10">
      <div className="flex-1" />

      <Link to="/" className="flex-1 justify-center hidden md:flex">
        <img src={logo} alt="GreenHaul Logo" className="h-16" />
      </Link>

      <div className="flex-1 flex items-center justify-end gap-10">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.route}
            className={({ isActive }) =>
              cn(
                !link.title.includes("Contribute")
                  ? "text-primary-green font-bold text-xl hover-underline-animation"
                  : "text-header",
                isActive ? "after:w-full" : "",
                "text-lg whitespace-nowrap"
              )
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
