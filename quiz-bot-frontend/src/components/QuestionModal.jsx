import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

const QuestionModal = ({
  isOpen,
  onClose,
  fetchQuestions,
  question,
  setAlert,
  categories = [], // Provide a default empty array for categories
}) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(""); // Add this line

  useEffect(() => {
    if (question) {
      setQuestionText(question.question);
      setOptions(question.options);
      setCorrectAnswer(question.correctAnswer);
      setCategory(question.category_id);
      setLevel(question.level); // Set the level when editing a question
    } else {
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      setCategory("");
      setLevel(""); // Reset level when adding a new question
    }
  }, [question]);

  const handleSave = async () => {
    try {
      const data = {
        question: questionText,
        options,
        correctAnswer,
        category_id: category,
        level, // Add level here
      };

      if (question) {
        await axios.put(`/api/questions/${question.id}`, data);
        setAlert({
          show: true,
          message: "Question updated successfully",
          type: "success",
        });
      } else {
        await axios.post("/api/questions", data);
        setAlert({
          show: true,
          message: "Question added successfully",
          type: "success",
        });
      }

      // Fetch updated questions
      fetchQuestions();

      // Close the modal
      onClose();

      // Clear the form fields
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      setCategory("");
      setLevel("");
    } catch (error) {
      console.error("Error saving question:", error);
      setAlert({
        show: true,
        message: "Error saving question",
        type: "error",
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {question ? "Edit Question" : "Add Question"}
        </h2>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
          placeholder="Question"
        />
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border border-gray-300 p-2 w-full mb-2"
              placeholder={`Option ${index + 1}`}
            />
            <label>
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
              />
              Correct Answer
            </label>
          </div>
        ))}

        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option>
          )}
        </select>

        {/* Level Select */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4"
        >
          <option value="">Select Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>

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

export default QuestionModal;
