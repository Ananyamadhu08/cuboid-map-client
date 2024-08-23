import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUserMapCaptures } from "../slices/mapSlice";
import Layout from "../layout/Layout";

const SavedMapCaptures: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { captures, status, error } = useSelector(
    (state: RootState) => state.map,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCapture, setSelectedCapture] = useState(null);

  const openModal = (capture) => {
    setSelectedCapture(capture);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchUserMapCaptures());
  }, [dispatch]);

  if (status === "loading") return <p>Loading captures...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {captures.map((capture) => (
          <Card key={capture.id} onClick={() => openModal(capture)}>
            <img
              src={capture.imageUrl}
              alt={capture.title}
              className="h-32 w-full rounded-t-lg object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold dark:text-white">
                {capture.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {capture.date}
              </p>
            </div>
          </Card>
        ))}

        {isModalOpen && selectedCapture && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalTitle>{selectedCapture.title}</ModalTitle>
            <ModalContent>
              <img
                src={selectedCapture.imageUrl}
                alt={selectedCapture.title}
                className="h-auto w-full rounded-lg"
              />
              <p className="mt-4 text-gray-700 dark:text-gray-200">
                Captured on: {selectedCapture.date}
              </p>
              {/* Add more details or actions here */}
            </ModalContent>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              {/* Add edit or delete buttons here */}
            </ModalFooter>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default SavedMapCaptures;
