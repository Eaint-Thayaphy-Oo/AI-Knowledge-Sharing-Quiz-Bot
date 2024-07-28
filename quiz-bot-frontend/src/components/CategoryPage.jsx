import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryModal from "./CategoryModal";

// Set the base URL for Axios
axios.defaults.baseURL = "http://localhost:8000";

// Add a request interceptor to include the token in all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setAlert({ show: true, message: "Category deleted successfully", type: "success" });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      setAlert({ show: true, message: "Error deleting category", type: "error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  return (
    <div className="p-6">
      {alert.show && (
        <div className={`alert alert-${alert.type} mb-4 flex justify-between items-center`}>
          {alert.message}
          <button onClick={handleCloseAlert} className="ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category List</h1>
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-[#59F8E8] text-[#1e1b4b] rounded"
        >
          Add Category
        </button>
      </div>
      <table className="w-full text-white">
        <thead className="bg-indigo-950">
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Category Name</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#89e2dc] text-[#1e1b4b]">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-2 border-b text-center">
                  {category.id}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {category.name}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchCategories={fetchCategories}
        category={selectedCategory}
        setAlert={setAlert}
      />
    </div>
  );
};

export default CategoryPage;
