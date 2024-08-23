import React from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import UserMenu from "./UserMenu";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-start">
          <a href="/" className="mr-4 flex items-center justify-between">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Cuboid Map
            </span>
          </a>
        </div>
        <div className="flex items-center lg:order-2">
          <DarkModeToggle />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
