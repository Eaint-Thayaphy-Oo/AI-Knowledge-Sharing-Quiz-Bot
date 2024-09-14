import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export const QuizHome = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(30);
  const [totalTimer, setTotalTimer] = useState(600); // 10 minutes in seconds
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const [level, setLevel] = useState(1); // Default level
  const [score, setScore] = useState(0);
  const [answersSummary, setAnswersSummary] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const [aiResponse, setAiResponse] = useState(""); // Store AI response
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [aiSearchHint, setAiSearchHint] = useState(""); // AI hints
  const [currentUser, setCurrentUser] = useState(null);
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [gameRoomId, setGameRoomId] = useState(null);

  // Fetch questions based on category and level
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

  // Per-question timer (30 seconds)
  useEffect(() => {
    if (!isAnswered && questionTimer > 0 && !isLevelCompleted) {
      const timerInterval = setInterval(() => {
        setQuestionTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (questionTimer === 0) {
      handleOptionClick(null); // Auto-submit when time runs out
    }
  }, [isAnswered, questionTimer, isLevelCompleted]);

  // Total quiz timer (10 minutes)
  useEffect(() => {
    if (totalTimer > 0 && !isLevelCompleted) {
      const totalTimerInterval = setInterval(() => {
        setTotalTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(totalTimerInterval);
    }
  }, [totalTimer, isLevelCompleted]);

  // Handle answer selection
  const handleOptionClick = (option) => {
    if (isAnswered) return; // Prevent further answers after selection or timeout

    const correctAnswerIndex = questions[currentQuestionIndex]?.correctAnswer;
    const correctAnswerOption =
      questions[currentQuestionIndex]?.options[correctAnswerIndex];

    const isAnswerCorrect = option === correctAnswerOption;
    const questionScore = isAnswerCorrect ? 10 : 0; // Assign score based on correctness

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + questionScore); // Increment score
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

  // Go to the next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsLevelCompleted(true); // End the level after the last question
    }
    setQuestionTimer(30); // Reset timer for the next question
    setSelectedOption(null);
    setIsCorrect(null);
    setIsAnswered(false);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setQuestionTimer(30); // Reset timer for the previous question
      setSelectedOption(null); // Reset selected option for the previous question
      setIsCorrect(null); // Reset correct/incorrect indicator for the previous question
      setIsAnswered(false); // Reset answered state for the previous question
    }
  };

  // Retry the current level
  const retryLevel = () => {
    setIsLevelCompleted(false); // Ensure this is reset
    setCurrentQuestionIndex(0);
    setScore(0); // Reset score for retry
    setAnswersSummary([]);
    setQuestionTimer(30);
    setTotalTimer(600); // Reset total timer for 10 minutes
    setIsAnswered(false);
  };

  const storeScore = async () => {
    // Ensure user is logged in before saving score
    if (!currentUser || !currentUser.id) {
      console.error("User not logged in or user ID is missing!");
      return;
    }

    const data = {
      user_id: currentUser.id, // Ensure this exists
      total_score: score,
    };

    try {
      console.log("Saving final score to the database...");
      console.log("data: ", data);
      const response = await axios.post("/api/save-score", data);
      console.log("Final score saved:", response.data);
    } catch (error) {
      console.error("Error saving final score:", error.message);
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setCurrentUser(savedUser);
    } else {
      console.warn("No user found in localStorage.");
    }
  }, []);

  const checkLevelResults = () => {
    if (level === 3) {
      // Level 3 Logic
      if (score >= 50) {
        // Show Quit, Retry Level, and Winning Screen
        return (
          <div className="space-y-2">
            <button
              onClick={() => (window.location.href = "/")} // Quit button
              className="bg-red-500 text-white py-4 px-6 rounded mr-3"
            >
              Quit
            </button>
            <button
              onClick={retryLevel} // Retry Level button
              className="bg-yellow-500 text-white py-4 px-6 rounded mr-3"
            >
              Retry Level
            </button>
            <button
              onClick={() =>
                (window.location.href = `/winningscreen?category_id=${categoryId}&room_id=${gameRoomId}`)
              } // Replace with the actual winning screen logic
              className="bg-green-500 text-white py-4 px-6 rounded"
            >
              Winning Screen
            </button>
          </div>
        );
      } else {
        // Score < 50: Show Quit and Retry Level buttons
        return (
          <div className="space-y-2">
            <button
              onClick={() => (window.location.href = "/")} // Quit button
              className="bg-red-500 text-white py-4 px-6 rounded mr-3"
            >
              Quit
            </button>
            <button
              onClick={retryLevel} // Retry Level button
              className="bg-yellow-500 text-white py-4 px-6 rounded"
            >
              Retry Level
            </button>
          </div>
        );
      }
    } else {
      // Levels 1 and 2 Logic
      if (score >= 50) {
        // Show Quit, Retry Level, and Next Level buttons
        return (
          <div className="space-y-2">
            <button
              onClick={() => (window.location.href = "/")} // Quit button
              className="bg-red-500 text-white py-4 px-6 rounded mr-3"
            >
              Quit
            </button>
            <button
              onClick={retryLevel} // Retry Level button
              className="bg-yellow-500 text-white py-4 px-6 rounded mr-3"
            >
              Retry Level
            </button>
            <button
              onClick={() => {
                // saveScoreToDatabase();
                setLevel(level + 1); // Go to next level
                setIsLevelCompleted(false);
                setCurrentQuestionIndex(0);
                setQuestionTimer(30);
                setTotalTimer(600); // Reset total timer
                setAnswersSummary([]); // Clear answer summary
                setScore(0);
              }}
              className="bg-green-500 text-white py-4 px-6 rounded"
            >
              Next Level
            </button>
          </div>
        );
      } else {
        // Score < 50: Show Quit and Retry Level buttons
        return (
          <div className="space-y-2">
            <button
              onClick={() => (window.location.href = "/")} // Quit button
              className="bg-red-500 text-white py-4 px-6 rounded mr-3"
            >
              Quit
            </button>
            <button
              onClick={retryLevel} // Retry Level button
              className="bg-yellow-500 text-white py-4 px-6 rounded"
            >
              Retry Level
            </button>
          </div>
        );
      }
    }
  };
  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;
  const progressBarWidth = `${(questionTimer / 30) * 100}%`;

  // Ask AI Bot
  const askAiBot = async () => {
    const question = questions[currentQuestionIndex]?.question;
    if (!question) return;

    setIsAiLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/openai", {
        prompt: `Help me answer this question: ${question}`,
      });

      const aiResponseText =
        response.data.choices?.[0]?.text || "AI did not provide a response.";
      setAiResponse(aiResponseText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Sorry, something went wrong while fetching the answer.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Fetch AI Search Hint
  const fetchAiSearchHint = async (text) => {
    if (!text) {
      setAiSearchHint("");
      return;
    }

    setIsAiLoading(true);
    try {
      const response = await axios.post(
        "/api/openai", // Call your backend route
        {
          prompt: `Give a hint related to: ${text}`,
          max_tokens: 50,
        }
      );

      const aiResponseText =
        response.data.choices?.[0]?.text || "No hints available.";
      setAiSearchHint(aiResponseText);
    } catch (error) {
      console.error("Error fetching AI hint:", error);
      setAiSearchHint("Sorry, something went wrong while fetching the hint.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle user typing in search box
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    fetchAiSearchHint(text); // Fetch AI hint based on input
  };

  useEffect(() => {
    if (isLevelCompleted) {
      saveScoreToDatabase();
    }
  }, [isLevelCompleted]);

  useEffect(() => {
    // Example: Set gameRoomId from URL or API
    const roomIdFromParams = searchParams.get("game_room_id");
    if (roomIdFromParams) {
      setGameRoomId(roomIdFromParams);
    }
  }, [searchParams]);

  // const saveScoreToDatabase = async () => {
  //   if (isSavingScore) return;
  //   setIsSavingScore(true);

  //   try {
  //     const response = await axios.post("/api/save-score", {
  //       user_id: currentUser.id,
  //       level: level,
  //       score: score,
  //       game_room_id: gameRoomId,
  //       category_id: categoryId,
  //     });
  //     console.log("Score saved:", response.data);
  //   } catch (error) {
  //     console.error("Error saving score:", error);
  //   } finally {
  //     setIsSavingScore(false);
  //   }
  // };

  const saveScoreToDatabase = async () => {
    try {
      const scoreData = {
        // user_id: currentUser.id, // Use valid user ID
        // game_room_id: gameRoomId || 1, // Replace `1` with a default valid ID or remove `|| 1` if it's not needed
        // category_id: categoryId, // Valid category ID
        // level: 1,
        // score: 80, // Ensure valid score
        user_id: currentUser.id,
        game_room_id: gameRoomId,
        category_id: categoryId,
        level: level,
        score: score,
      };

      const response = await axios.post("/api/save-score", scoreData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Score saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving score:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

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
                {/* Search Box for AI Hints */}
                {/* <div className="search-box mt-5">
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="w-full p-4 rounded-lg"
                    placeholder="Type your question here..."
                  />
                  {isAiLoading && <p>Loading hints...</p>}
                  {aiSearchHint && (
                    <div className="mt-2 p-4 bg-gray-200 rounded">
                      <strong>AI Hint:</strong>
                      <p>{aiSearchHint}</p>
                    </div>
                  )}
                </div> */}
                {/* AI Bot and Hint Area */}
                {/* <div className="ai-bot-helper mt-5">
                  <button
                    onClick={askAiBot}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={isAiLoading}
                  >
                    {isAiLoading ? "Asking AI..." : "Ask AI for Help"}
                  </button>

                  {aiResponse && (
                    <div className="mt-4 p-4 bg-gray-200 rounded">
                      <strong>AI Bot Suggestion:</strong>
                      <p>{aiResponse}</p>
                    </div>
                  )}
                </div> */}
                {isLevelCompleted && (
                  <>
                    <div className="text-center p-6">
                      <h2 className="text-2xl">Level Completed!</h2>
                      <div className="mb-4">
                        <p className="text-black">Your Score: {score}</p>
                      </div>
                      <div className="space-y-2">
                        {/* Display checkLevelResults here */}
                        {checkLevelResults()}
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
                                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
