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

  if (status === "loading") return <p>Loading top regions...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <Layout>
      <div>
        <h2>Top Captured Regions</h2>
        <ul>
          {captures.map((capture) => (
            <li key={capture.id}>
              <h3>{capture.title}</h3>
              <p>Longitude: {capture.longitude}</p>
              <p>Latitude: {capture.latitude}</p>
              <p>Zoom: {capture.zoom}</p>
              <p>Bearing: {capture.bearing}</p>
              <p>Pitch: {capture.pitch}</p>
              <img src={capture.imageUrl} alt={capture.title} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default TopCapturedRegions;
