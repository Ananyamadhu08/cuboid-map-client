import React, { ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
};

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-4 rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
      {children}
    </div>
  );
};

export default ModalFooter;
