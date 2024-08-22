import React, { ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
};

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
      {children}
    </div>
  );
};

export default ModalFooter;
