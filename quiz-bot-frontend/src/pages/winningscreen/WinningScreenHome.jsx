import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

export const WinningScreenHome = ({ userId }) => {
  const [userScores, setUserScores] = useState([]);
  const [searchParams] = useSearchParams();
  const [hasFetched, setHasFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Store current user

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/current-user");
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error.message);
      }
    };

    if (!userId) {
      fetchCurrentUser();
    }
  }, [userId]);

  // Fetch scores
  const fetchScores = async () => {
    try {
      const category_id = searchParams.get("category_id");
      const room_id = searchParams.get("room_id");
      const response = await axios.get("/api/latest-scores", {
        params: {
          user_id: userId || currentUser?.id,
          category_id: category_id,
          room_id: room_id,
        },
      });
      console.log("Response data:", response.data); // Log the full response
      setUserScores(response.data);
    } catch (error) {
      console.error("Error fetching scores:", error.message);
    }
  };

  useEffect(() => {
    if ((userId || currentUser) && !hasFetched) {
      fetchScores();
      setHasFetched(true);
    }
  }, [userId, currentUser, hasFetched]);

  // Render the scores for each user
  const renderUserScores = () => (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Player Scores</h2>
      <div className="grid grid-cols-3 gap-4">
        {userScores.map((score) => (
          <div key={score.id} className="p-4 border rounded-lg">
            <h3 className="text-lg font-bold">{score.username}</h3>
            <p>Score: {score.score}</p>
            <p>Level: {score.level}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-indigo-950 min-h-screen flex flex-col justify-center items-center bg-cover bg-center p-4">
      <h1 className="text-white uppercase font-semibold text-3xl sm:text-5xl mt-20 sm:mt-56">
        Congratulations!
      </h1>
      <div className="p-12 bg-white w-8/12 rounded-lg mt-24">
        {renderUserScores()} {/* Render the scores for each user */}
      </div>
      {/* <Link to="/quiz">
        <Button
          variant="outline"
          className="w-48 p-8 font-semibold text-2xl rounded-full mt-14 bg-[#59F8E8]"
        >
          Play Again
        </Button>
      </Link> */}
      <Link to="/">
        <Button
          variant="outline"
          className="w-32 p-5 font-semibold text-2xl rounded-full mt-5 bg-[#59F8E8]"
        >
          Quit
        </Button>
      </Link>
    </div>
  );
};
