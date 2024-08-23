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
    role="menuitem"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        close();
      }
    }}
  >
    {children}
  </div>
);

export default DropdownItem;
