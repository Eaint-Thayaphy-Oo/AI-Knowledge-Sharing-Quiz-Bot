import React, { useState } from "react";
import axios from "axios";

const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(
        "/api/create-room",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRoomCode(response.data.room_code);
      setMessage("Room created successfully");
    } catch (error) {
      setMessage(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div className="create-room-container">
      <button onClick={handleCreateRoom}>Create Room</button>
      {roomCode && <p>Room Code: {roomCode}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateRoom;
