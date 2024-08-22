import React from "react";
import Card from "../components/Card";
import Tabs from "../components/Tabs";
import Layout from "../layout/Layout";

const Home: React.FC = () => {
  const tabData = [
    {
      label: "Map Vew",
      content: (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      ),
    },
    {
      label: "3D Cuboid View",
      content: (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="mb-4">
        <Tabs tabs={tabData} />
      </div>
    </Layout>
  );
};

export default Home;
