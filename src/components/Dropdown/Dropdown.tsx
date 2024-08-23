import React, { cloneElement, ReactElement, ReactNode } from "react";
import useDropdown from "../../hooks/useDropdown";
import DropdownItem from "./DropdownItem";

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
      <div
        onClick={toggle}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
      >
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

export default Dropdown;
