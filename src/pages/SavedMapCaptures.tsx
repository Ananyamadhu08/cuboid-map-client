import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUserMapCaptures } from "../slices/mapSlice";
import Layout from "../layout/Layout";
import { Loader } from "../components/Loader";

const SavedMapCaptures: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { captures, status } = useSelector((state: RootState) => state.map);

  useEffect(() => {
    dispatch(fetchUserMapCaptures());
  }, [dispatch]);

  return (
    <Layout>
      {status === "succeeded" && (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <Loader />
        </div>
      )}

      {status === "failed" && (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <p className="text-center text-3xl font-semibold text-red-600 dark:text-red-400">
            Some thing went wrong
          </p>
        </div>
      )}

      {status === "loading" && (
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {captures.map((capture) => (
            <div
              key={capture.id}
              className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <img
                src={capture.imageUrl}
                alt={capture.title}
                className="h-48 w-full object-cover transition-opacity duration-300 hover:opacity-90"
              />
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                  {capture.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Longitude: {capture.longitude?.toFixed(4)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Latitude: {capture.latitude?.toFixed(4)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zoom: {capture.zoom?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bearing: {capture.bearing?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pitch: {capture.pitch?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {status !== "loading" && (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <Loader />
        </div>
      )}
    </Layout>
  );
};

export default SavedMapCaptures;
