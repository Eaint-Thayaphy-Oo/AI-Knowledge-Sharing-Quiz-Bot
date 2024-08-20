import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Pusher from "pusher-js";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (roomCode) {
      const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
        cluster: import.meta.env.VITE_PUSHER_CLUSTER,
      });

      const channel = pusher.subscribe("room." + roomCode);
      channel.bind("roomCreated", (data) => {
        console.log("Room created: ", data);
      });

      channel.bind("roomJoined", (data) => {
        console.log("Room joined: ", data);
      });

      return () => {
        pusher.unsubscribe("room." + roomCode);
      };
    }
  }, [roomCode]);

  const handleCreateRoom = async () => {
    try {
      console.log("Sending request to create room...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-room`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response received:", response);

      if (response && response.data) {
        setRoomCode(response.data.room_code);
        setMessage("Room created successfully");
      } else {
        setMessage("Unexpected response structure");
        console.log("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error creating room:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setMessage(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
        setMessage("An unknown error occurred");
      }
    }
  };

  const handleJoinRoom = async () => {
    try {
      console.log("Sending request to join room with room code:", roomId);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/join-room`,
        { room_code: roomId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response received:", response);
      setMessage(`Joined room: ${response.data.room_code}`);
      navigate("/category");
    } catch (error) {
      console.error("Error joining room:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        if (
          error.response.data.message === "You cannot join a room you created."
        ) {
          setMessage("You cannot join a room you created.");
        } else {
          setMessage(`Error: ${error.response.data.message}`);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center h-screen text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
    >
      <img
        src="/assets/images/logo.png"
        alt="logo"
        className="mx-auto mb-10 w-64 sm:w-80 md:w-96"
      />
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-10 sm:mb-20">
        Let's Play Some Quiz
      </p>
      <div className="bg-white p-3 w-80 rounded-[20px] mx-auto">
        <p className="font-bold text-2xl mt-8 mb-12">
          Enter Room ID <br /> To Join The Game
        </p>
        <Input
          placeholder="Enter Room ID"
          className="w-36 mx-auto"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button
          variant="outline"
          className="w-36 p-6 flex font-bold rounded-full -mb-8 mt-14 ml-20 bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
          onClick={handleJoinRoom}
        >
          Next <ArrowRight color="grey" className="ml-2" />
        </Button>
        {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}
      </div>
      <div>
        <p className="font-bold text-md sm:text-lg flex items-center justify-center text-white mt-8">
          Or
        </p>
        <Button
          variant="outline"
          className="w-36 p-6 lg:mx-auto flex font-bold rounded-full mt-10 ml-32 bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
          onClick={handleCreateRoom}
        >
          Create Room <ArrowRight color="grey" className="ml-2" />
        </Button>
        {roomCode && <p className="text-[#59F8E8]">Room Code: {roomCode}</p>}
        {message && <p className="mt-4 text-[#59F8E8]">{message}</p>}
      </div>
      {/* <div>
        <p className="font-bold text-md sm:text-lg flex items-center justify-center text-white mt-8">
          Or
        </p>
        <Link
          to="/invite"
          className="underline text-white font-bold text-md sm:text-lg flex items-center justify-center ml-1"
        >
          Invite a friend
        </Link>
      </div> */}
    </div>
  );
};

export default Home;
