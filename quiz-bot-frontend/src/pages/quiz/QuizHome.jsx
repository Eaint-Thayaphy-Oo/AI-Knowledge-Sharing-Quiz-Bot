import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export const QuizHome = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const [level, setLevel] = useState(1); // Default level
  const [score, setScore] = useState(0);
  const [answersSummary, setAnswersSummary] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `/api/questions?category_id=${categoryId}&level=${level}`
        );
        setQuestions(response.data);
        setCurrentQuestionIndex(0); // Reset index for new level
        setAnswersSummary([]); // Reset answer summary for new level
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, [categoryId, level]);

  useEffect(() => {
    if (!isAnswered) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            handleOptionClick(null); // Automatically answer as incorrect
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [isAnswered]);

  const handleOptionClick = (option) => {
    if (isAnswered) return; // Prevent further answers after selection or timeout

    const correctAnswerIndex = questions[currentQuestionIndex]?.correctAnswer;
    const correctAnswerOption =
      questions[currentQuestionIndex]?.options[correctAnswerIndex];

    const isAnswerCorrect = option === correctAnswerOption;
    const questionScore = isAnswerCorrect ? 10 : 0; // Assign score based on correctness

    if (isAnswerCorrect) {
      setScore(score + questionScore); // Increment score for correct answer
    }

    // Record the answer summary with score
    setAnswersSummary((prevSummary) => [
      ...prevSummary,
      {
        question: questions[currentQuestionIndex].question,
        selectedOption: option,
        correctOption: correctAnswerOption,
        isCorrect: isAnswerCorrect,
        score: questionScore,
      },
    ]);

    setSelectedOption(option);
    setIsCorrect(isAnswerCorrect);
    setIsAnswered(true); // Mark as answered to stop the timer
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsLevelCompleted(true);
    }
    setTimer(30); // Reset timer for the next question
    setSelectedOption(null); // Reset selected option for the next question
    setIsCorrect(null); // Reset correct/incorrect indicator
    setIsAnswered(false); // Reset answered state for the next question
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setTimer(30); // Reset timer for the previous question
      setSelectedOption(null); // Reset selected option for the previous question
      setIsCorrect(null); // Reset correct/incorrect indicator for the previous question
      setIsAnswered(false); // Reset answered state for the previous question
    }
  };

  const retryLevel = () => {
    setCurrentQuestionIndex(0);
    setScore(0); // Reset score
    setAnswersSummary([]); // Reset answer summary
    setIsLevelCompleted(false);
    setTimer(30); // Reset timer for the first question
    setIsAnswered(false); // Reset answered state for the new level
  };

  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;
  const progressBarWidth = `${(timer / 30) * 100}%`;

  return (
    <div className="bg-indigo-950 text-center min-h-screen flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-[#59F8E8] mb-10 text-2xl sm:text-3xl">
          Level {level}
        </h1>
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
            <div>
              <div className="bg-white w-full rounded-t-[50px] p-10 mt-10">
                <h1 className="text-end">
                  {currentQuestionNumber}/{totalQuestions}
                </h1>
                <ul className="space-y-4 mt-10">
                  {questions[currentQuestionIndex].options.map(
                    (option, idx) => (
                      <li
                        key={idx}
                        className={`drop-shadow-xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full mx-auto p-5 mt-10 cursor-pointer
                    ${
                      selectedOption
                        ? option === selectedOption
                          ? isCorrect
                            ? "bg-[#7CF979]" // Correct answer (Green)
                            : "bg-[#FF8585]" // Incorrect answer (Red)
                          : "bg-slate-100"
                        : "bg-slate-100"
                    }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-4 space-x-4">
                  <button
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextQuestion}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Next
                  </button>
                </div>
                {isLevelCompleted && (
                  <>
                    <div className="text-center p-6">
                      <h2 className=" text-2xl ">Level Completed!</h2>
                      <div className="mb-4">
                        <p className="text-white">Your Score: {score}</p>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={retryLevel} // Retry current level
                          className="bg-red-500 text-white py-4 px-6 rounded mr-3"
                        >
                          Retry Level
                        </button>
                        <button
                          onClick={() => setLevel(level + 1)} // Move to next level
                          className="bg-green-500 text-white py-4 px-6 rounded"
                        >
                          Next Level
                        </button>
                      </div>
                      <button
                        onClick={() => setIsOpen(true)} // Open summary modal
                        className="bg-gray-700 text-white py-4 px-6 rounded mt-4"
                      >
                        View Answer Summary
                      </button>
                    </div>

                    {/* Answer Summary Modal */}
                    {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white p-6 rounded-lg w-3/4 sm:w-1/2 lg:w-2/3 max-w-4xl">
                          <h3 className="text-xl font-semibold mb-4">
                            Answer Summary
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 ">
                                <tr>
                                  <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Question
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Selected Option
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Correct Option
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Score
                                  </th>
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Result
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {answersSummary.map((answer, index) => (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {answer.question}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {answer.selectedOption}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {answer.correctOption}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {answer.score}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {answer.isCorrect
                                        ? "Correct"
                                        : "Incorrect"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => setIsOpen(false)}
                              className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-white font-semibold text-lg sm:text-xl mb-10">
            No more questions or none found for this category.
          </p>
        )}
      </div>
    </div>
  );
};
