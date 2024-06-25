import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const AdminDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  return (
    <div className="bg-gradient-to-t from-indigo-50 to-indigo-950 min-h-screen  md:flex-row text-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
        <MainContent selectedMenuItem={selectedMenuItem} />
      </div>
    </div>
  );
};

export default AdminDashboard;
