import React, { ReactNode } from "react";

type ModalTitleProps = {
  children: ReactNode;
};

const ModalTitle: React.FC<ModalTitleProps> = ({ children }) => {
  return (
    <div className="rounded-t border-b p-4 md:p-5 dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {children}
      </h3>
    </div>
  );
};

export default ModalTitle;
