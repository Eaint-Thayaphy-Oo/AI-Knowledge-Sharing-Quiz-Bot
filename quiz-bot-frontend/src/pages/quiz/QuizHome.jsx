import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { UserRound } from "lucide-react";

export const QuizHome = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(30); 
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions", {
          params: { category_id: categoryId },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      console.log("Quiz finished!");
      return;
    }

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          // Move to the next question when timer ends
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          return 30; // Reset timer for the next question
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [currentQuestionIndex, questions.length]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    const correctAnswerIndex = questions[currentQuestionIndex]?.correctAnswer;
    const correctAnswerOption =
      questions[currentQuestionIndex]?.options[correctAnswerIndex];

    if (correctAnswerOption) {
      setIsCorrect(
        option.trim().toLowerCase() === correctAnswerOption.trim().toLowerCase()
      );
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }, 2000);
  };

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;

  // Calculate the width of the progress bar based on the timer
  const progressBarWidth = `${(timer / 30) * 100}%`;

  return (
    <div className="bg-indigo-950 text-center min-h-screen flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-[#59F8E8] mb-10 text-2xl sm:text-3xl">Level 1</h1>
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <>
            <p className="text-white font-semibold text-lg sm:text-xl mb-10">
              {questions[currentQuestionIndex].question}
            </p>
            <div className="w-3/4 bg-white h-2 rounded mx-auto relative">
              <div
                className="absolute top-0 left-0 h-full bg-[#59F8E8] rounded"
                style={{ width: progressBarWidth }}
              ></div>
            </div>
            <div className="flex justify-between mt-10 mb-10 px-5">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-10 h-10 border-[#59F8E8] border-2 flex items-center justify-center">
                  <UserRound className="mx-auto" />
                </div>
                <span className="text-white mt-2">10</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-10 h-10 border-[#FF8585] border-2 flex items-center justify-center">
                  <UserRound className="mx-auto" />
                </div>
                <span className="text-white mt-2">10</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-white font-semibold text-lg sm:text-xl mb-10">
            No more questions or none found for this category.
          </p>
        )}
      </div>
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <div className="bg-white w-full rounded-t-[50px] p-10">
            <h1 className="text-end">
              {currentQuestionNumber}/{totalQuestions}
            </h1>
            <ul className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, idx) => (
                <li
                  key={idx}
                  className={`drop-shadow-xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full mx-auto p-5 mt-10 cursor-pointer
                    ${
                      selectedOption
                        ? option === selectedOption
                          ? isCorrect
                            ? "bg-[#7CF979]" // Correct answer
                            : "bg-[#FF8585]" // Incorrect answer
                          : "bg-slate-100"
                        : "bg-slate-100"
                    }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-white">
          No more questions or none found for this category.
        </p>
      )}
      <div className="flex flex-col items-center">
        <button
          onClick={openForm}
          className="bg-gray-700 text-white py-4 px-6 rounded-lg fixed bottom-4 right-4"
        >
          Ask AI
        </button>

        {isOpen && (
          <div className="chat-popup fixed bottom-0 right-4 border-2 border-gray-300 bg-white p-4 w-72 sm:w-80">
            <div className="form-container">
              <h1>AI Assistant</h1>
              <p>
                "You seem to be unsure about this question. Would you like some
                help?"
              </p>
              <button
                onClick={() => alert("AI bot providing help...")}
                className="bg-green-500 text-white py-4 px-6 rounded w-full mb-2"
              >
                Yes, help me!
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="bg-red-500 text-white py-4 px-6 rounded w-full"
              >
                No, thanks.
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
