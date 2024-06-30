import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
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
          className="w-36 p-6 flex font-bold rounded-full -mb-8 mt-14 ml-20 bg-[#59F8E8]  hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
          onClick={handleJoinRoom}
        >
          Next <ArrowRight color="grey" className="ml-2" />
        </Button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
      <div>
        <p className="font-bold text-md sm:text-lg flex items-center justify-center text-white mt-8">
          Or
        </p>
        <Link
          to="/invite"
          className="underline text-white font-bold text-md sm:text-lg flex items-center justify-center ml-1"
        >
          Invite a friend
        </Link>
      </div>
    </div>
  );
};

export default Home;
