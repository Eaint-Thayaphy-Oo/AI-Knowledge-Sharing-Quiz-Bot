import React, { useState } from "react";
import axios from "axios";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");

  const handleJoinRoom = async () => {
    try {
      const response = await axios.post(
        "/api/join-room",
        { room_code: roomId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(`Joined room: ${response.data.room_code}`);
    } catch (error) {
      setMessage(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default JoinRoom;
