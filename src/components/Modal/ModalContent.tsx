import React, { ReactNode } from "react";

type ModalContentProps = {
  children: ReactNode;
};

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className="space-y-4 p-4 md:p-5">{children}</div>;
};

export default ModalContent;
