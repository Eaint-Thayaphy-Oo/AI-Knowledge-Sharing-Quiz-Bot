import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

const AdminDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/questions");
      console.log("Fetched Questions:", response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  return (
    <div className="flex bg-gradient-to-t from-indigo-50 to-indigo-950 min-h-screen text-white">
      <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <MainContent
          selectedMenuItem={selectedMenuItem}
          categories={categories}
          fetchCategories={fetchCategories}
          questions={questions}
          fetchQuestions={fetchQuestions}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
