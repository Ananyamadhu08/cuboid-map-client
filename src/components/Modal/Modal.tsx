import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-1 text-gray-400 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <span className="sr-only">Close modal</span>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
