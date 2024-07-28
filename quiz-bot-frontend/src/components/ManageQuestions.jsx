import React, { useState } from "react";
import axios from "axios";

const ManageQuestions = ({ categories, questions, fetchQuestions }) => {
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: "",
    categoryId: "",
  });

  const handleAddQuestion = async () => {
    try {
      await axios.post("/api/questions", newQuestion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchQuestions(newQuestion.categoryId);
      setNewQuestion({ question: "", answer: "", categoryId: "" });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div>
      <h2>Create Question</h2>
      <select
        value={newQuestion.categoryId}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, categoryId: e.target.value })
        }
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newQuestion.question}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, question: e.target.value })
        }
        placeholder="Question"
      />
      <input
        type="text"
        value={newQuestion.answer}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, answer: e.target.value })
        }
        placeholder="Answer"
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>{question.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageQuestions;
