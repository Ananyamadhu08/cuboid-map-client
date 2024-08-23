import React from "react";
import Dropdown, { DropdownItem } from "./Dropdown";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../slices/authSlice";

const UserMenu: React.FC = () => {
  const { logoutUser } = useAuth();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Dropdown
      trigger={
        <Button
          variant="avatar"
          className="mx-3 flex rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
          imgAlt="user photo"
        >
          <span className="sr-only">Open user menu</span>
        </Button>
      }
    >
      <div className="px-4 py-3">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {user?.username}
        </span>
        <span className="block truncate text-sm text-gray-900 dark:text-white">
          {user?.email}
        </span>
      </div>
      <div className="py-1 text-gray-700 dark:text-gray-300">
        <DropdownItem close={() => {}}>My profile</DropdownItem>
        <DropdownItem close={() => {}}>Account settings</DropdownItem>
      </div>
      <div
        onClick={handleLogout}
        className="py-1 text-gray-700 dark:text-gray-300"
      >
        <DropdownItem close={() => {}}>Sign out</DropdownItem>
      </div>
    </Dropdown>
  );
};

export default UserMenu;
