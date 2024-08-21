import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionModal from "./QuestionModal";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [selectedLevel, setSelectedLevel] = useState(1); // Default to level 1
  const [selectedCategory, setSelectedCategory] = useState(""); // Initially null

  const showAlert = ({ show, message, type }) => {
    setAlert({ show, message, type });
  };

  const fetchQuestions = async (categoryId, level) => {
    try {
      const response = await axios.get(
        `/api/questions?category_id=${categoryId}&level=${level}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);

      // Set default category once categories are fetched
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0].id); // Default to first category
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch questions only when category and level are selected
    if (selectedCategory !== null) {
      fetchQuestions(selectedCategory, selectedLevel);
    }
  }, [selectedCategory, selectedLevel]);

  const handleLevelChange = (event) => {
    const newLevel = parseInt(event.target.value, 10);
    setSelectedLevel(newLevel);
  };

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      setAlert({
        show: true,
        message: "Question deleted successfully",
        type: "success",
      });
      fetchQuestions(selectedCategory, selectedLevel);
    } catch (error) {
      console.error("Error deleting question:", error);
      setAlert({
        show: true,
        message: "Error deleting question",
        type: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="p-6">
      {alert.show && (
        <div
          className={`alert alert-${alert.type} mb-4 flex justify-between items-center`}
        >
          {alert.message}
          <button onClick={handleCloseAlert} className="ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Question List</h1>
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-[#59F8E8] text-[#1e1b4b] rounded"
        >
          Add Question
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="level" className="mr-2">
          Select Level:
        </label>
        <select
          id="level"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="px-4 py-2 bg-[#59F8E8] text-[#1e1b4b] rounded"
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          className="px-4 py-2 bg-[#59F8E8] text-[#1e1b4b] rounded"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full text-white">
        <thead className="bg-indigo-950">
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Question</th>
            <th className="px-4 py-2 border-b">Option A</th>
            <th className="px-4 py-2 border-b">Option B</th>
            <th className="px-4 py-2 border-b">Option C</th>
            <th className="px-4 py-2 border-b">Option D</th>
            <th className="px-4 py-2 border-b">Correct Answer</th>
            <th className="px-4 py-2 border-b">Category ID</th>
            <th className="px-4 py-2 border-b">Level</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#89e2dc] text-[#1e1b4b]">
          {questions.length === 0 ? (
            <tr>
              <td colSpan="10" className="px-4 py-2 text-center">
                No questions available
              </td>
            </tr>
          ) : (
            questions.map((question) => (
              <tr key={question.id}>
                <td className="px-4 py-2 border-b text-center">
                  {question.id}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.question}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.options[0]}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.options[1]}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.options[2]}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.options[3]}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.correctAnswer}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.category_id}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {question.level}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEditQuestion(question)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion}
        category={selectedCategory}
        level={selectedLevel}
        fetchQuestions={() => fetchQuestions(selectedCategory, selectedLevel)}
        setAlert={showAlert}
        categories={categories} 
      />
    </div>
  );
};

export default QuestionPage;
