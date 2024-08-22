import React, { cloneElement, ReactElement, ReactNode } from "react";
import useDropdown from "../hooks/useDropdown";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const { isOpen, toggle, close, dropdownRef } = useDropdown();

  // TODO: check why the dropdown doesnt close when clicking on the dropdown item.
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DropdownItem) {
      return cloneElement(child as ReactElement<{ close: () => void }>, {
        close,
      });
    }
    return child;
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700">
          {clonedChildren}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  close: () => void;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ close, children }) => (
  <div
    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    onClick={() => {
      close();
    }}
  >
    {children}
  </div>
);

export default Dropdown;
export { DropdownItem };
