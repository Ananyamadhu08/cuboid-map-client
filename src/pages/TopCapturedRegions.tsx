import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchTopCapturedRegions } from "../slices/mapSlice";
import Layout from "../layout/Layout";

const TopCapturedRegions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { captures, status, error } = useSelector(
    (state: RootState) => state.map,
  );

  useEffect(() => {
    dispatch(fetchTopCapturedRegions());
  }, [dispatch]);

  if (status === "loading")
    return (
      <p className="text-center text-lg font-semibold text-gray-600 dark:text-gray-300">
        Loading top regions...
      </p>
    );
  if (status === "failed")
    return (
      <p className="text-center text-lg font-semibold text-red-600 dark:text-red-400">
        Error: {error}
      </p>
    );

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] p-4">
        <h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
          Top Captured Regions
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  Longitude: {capture.longitude?.toFixed(4) ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Latitude: {capture.latitude?.toFixed(4) ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Zoom: {capture.zoom?.toFixed(2) ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bearing: {capture.bearing?.toFixed(2) ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pitch: {capture.pitch?.toFixed(2) ?? "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TopCapturedRegions;
