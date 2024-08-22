import React, { useState } from "react";
import Button from "./Button";
import { Modal, ModalContent, ModalFooter, ModalTitle } from "./Modal";

const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform md:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Capture a Map View</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Saved Map Views</span>
            </a>
          </li>

          {/* Other Sidebar Items */}
          <Button onClick={openModal}>Open Modal</Button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalTitle>Terms of Service</ModalTitle>
            <ModalContent>
              <p>Some modal content goes here...</p>
            </ModalContent>
            <ModalFooter>
              <Button onClick={closeModal}>I accept</Button>
              <Button onClick={closeModal} variant="secondary">
                Decline
              </Button>
            </ModalFooter>
          </Modal>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
