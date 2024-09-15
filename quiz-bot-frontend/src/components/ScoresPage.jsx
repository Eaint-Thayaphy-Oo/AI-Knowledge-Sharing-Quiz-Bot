import React, { useEffect, useState } from "react";
import axios from "axios";

const ScoresPage = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/scores"
        );
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching scores:", error.message);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Scores</h2>
      <table  className="w-full text-white">
        <thead className="bg-indigo-950">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Game Room ID</th>
            <th className="px-4 py-2">Category ID</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Score</th>
            {/* <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th> */}
          </tr>
        </thead>
        <tbody className="bg-[#89e2dc] text-[#1e1b4b]">
          {scores.map((score) => (
            <tr key={score.id}>
              <td className="border px-4 py-2">{score.id}</td>
              <td className="border px-4 py-2">{score.username}</td>
              <td className="border px-4 py-2">{score.game_room_id}</td>
              <td className="border px-4 py-2">{score.category_id}</td>
              <td className="border px-4 py-2">{score.level}</td>
              <td className="border px-4 py-2">{score.score}</td>
              {/* <td className="border px-4 py-2">
                {new Date(score.created_at).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(score.updated_at).toLocaleString()}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresPage;
