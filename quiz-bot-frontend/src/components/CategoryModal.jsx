import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

const CategoryModal = ({
  isOpen,
  onClose,
  fetchCategories,
  category,
  setAlert,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSave = async () => {
    try {
      if (category) {
        await axios.put(`/api/categories/${category.id}`, { name });
        setAlert({
          show: true,
          message: "Category updated successfully",
          type: "success",
        });
      } else {
        await axios.post("/api/categories", { name });
        setAlert({
          show: true,
          message: "Category added successfully",
          type: "success",
        });
      }
      fetchCategories();
      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      setAlert({ show: true, message: "Error saving category", type: "error" });
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
          placeholder="Category Name"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#1e1b4b] text-white rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CategoryModal;
