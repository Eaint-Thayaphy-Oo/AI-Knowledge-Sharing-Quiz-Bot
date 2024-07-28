import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

const AdminDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selectedMenuItem === "Categories") {
      fetchCategories();
    }
  }, [selectedMenuItem]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="flex bg-gradient-to-t from-indigo-50 to-indigo-950 min-h-screen text-white">
      <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <MainContent
          selectedMenuItem={selectedMenuItem}
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
