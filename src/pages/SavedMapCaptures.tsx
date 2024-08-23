import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchUserMapCaptures, resetMapState } from "../slices/mapSlice"; // Ensure resetMapState action is defined in the slice
import Layout from "../layout/Layout";
import { Loader } from "../components/Loader";

const SavedMapCaptures: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { captures, status, currentPage } = useSelector(
    (state: RootState) => state.map,
  );
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCaptureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Reset the state when navigating to this page
    dispatch(resetMapState());
    dispatch(fetchUserMapCaptures({ page: 1, limit: 10 }));
  }, [dispatch]);

  const loadMoreCaptures = () => {
    if (status === "loading") return;

    dispatch(fetchUserMapCaptures({ page: currentPage + 1, limit: 10 })).then(
      (result) => {
        if (Array.isArray(result.payload) && result.payload.length < 10) {
          setHasMore(false); // No more captures to load
        }
      },
    );
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && status !== "loading") {
          loadMoreCaptures();
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      },
    );

    if (lastCaptureRef.current)
      observerRef.current.observe(lastCaptureRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, status]);

  return (
    <Layout>
      {status === "failed" && (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <p className="text-center text-3xl font-semibold text-red-600 dark:text-red-400">
            Something went wrong
          </p>
        </div>
      )}

      {status === "succeeded" && (
        <div className="min-h-[calc(100vh-80px)] p-4">
          <h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
            Top Captured Regions
          </h2>
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {captures.map((capture, index) => (
              <div
                key={capture.id}
                ref={index === captures.length - 1 ? lastCaptureRef : null}
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
        </div>
      )}

      {status === "loading" && (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
          <Loader />
        </div>
      )}
    </Layout>
  );
};

export default SavedMapCaptures;
