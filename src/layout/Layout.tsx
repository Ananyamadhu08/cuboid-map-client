import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 antialiased transition-colors duration-300 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main className="h-auto p-4 pt-20 md:ml-64">{children}</main>
    </div>
  );
};

export default Layout;
