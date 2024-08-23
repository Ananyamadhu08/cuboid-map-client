import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../slices/authSlice";
import MapView from "../components/MapView";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="mb-4">
        <MapView />
      </div>
    </Layout>
  );
};

export default Home;
