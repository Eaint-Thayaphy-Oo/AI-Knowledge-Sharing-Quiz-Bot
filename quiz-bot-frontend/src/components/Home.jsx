import React from "react";

export default function Home() {
  return (
    <>
      <div className="bg-red-400 text-center">
        <img src="/assets/images/logo.png" alt="logo" className="mx-auto" />
        <p className="text-xl font-semibold text-white">Let's Play Some Quiz</p>
        <div className="bg-slate-200 p-3 w-80 rounded-md mx-auto">
          <p>Enter Room ID To Join The Game</p>
          <input placeholder="Enter Room ID" />
        </div>
      </div>
    </>
  );
}
