import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

const AdminDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [theme, setTheme] = useState("light"); // Light mode by default

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
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  return (
    <div
      className={`flex ${
        theme === "light"
          ? "bg-gradient-to-t from-indigo-50 to-indigo-950"
          : "bg-gray-900"
      } min-h-screen text-white`}
    >
      <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleTheme={toggleTheme} />
        <MainContent
          selectedMenuItem={selectedMenuItem}
          categories={categories}
          fetchCategories={fetchCategories}
          questions={questions}
          fetchQuestions={fetchQuestions}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
