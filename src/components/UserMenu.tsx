import React from "react";
import Dropdown, { DropdownItem } from "./Dropdown";
import Button from "./Button";

const UserMenu: React.FC = () => {
  return (
    <Dropdown
      trigger={
        <Button
          variant="avatar"
          className="mx-3 flex rounded-full focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
          imgAlt="user photo"
        >
          <span className="sr-only">Open user menu</span>
        </Button>
      }
    >
      <div className="px-4 py-3">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          Jane Doe
        </span>
        <span className="block truncate text-sm text-gray-900 dark:text-white">
          jane@gmail.com
        </span>
      </div>
      <ul className="py-1 text-gray-700 dark:text-gray-300">
        <DropdownItem close={() => {}}>My profile</DropdownItem>
        <DropdownItem close={() => {}}>Account settings</DropdownItem>
      </ul>
      <ul className="py-1 text-gray-700 dark:text-gray-300">
        <DropdownItem close={() => {}}>Sign out</DropdownItem>
      </ul>
    </Dropdown>
  );
};

export default UserMenu;
