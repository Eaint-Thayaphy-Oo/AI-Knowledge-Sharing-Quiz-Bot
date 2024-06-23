import React from "react";
import { Button } from "@/components/ui/button";

export const WinningScreenHome = () => {
  return (
    <>
      {/* <div
        className="bg-indigo-950 h-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/assets/images/winning-screen.png')" }}
      >
        <h1 className="text-white uppercase  drop-shadow-[0px_2px_5px_rgba(225,225,225)] font-semibold text-5xl mt-56">
          congratulations!
        </h1>
        <div className="p-12 bg-white w-80 rounded-lg mt-24">
          <img src="/assets/images/winningcup.png" className="size-30 -mt-40"/>
          <h1 className="text-xl text-center">You</h1>
          <h2 className="font-semibold text-3xl text-center">Win!</h2>
        </div>
        <Button
          variant="outline"
          className="w-48 p-8 flex font-semibold text-2xl rounded-full mt-14 bg-[#59F8E8] shadow-xl  hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
        >
          Play Again
        </Button>
        <Button
          variant="outline"
          className="w-32 p-5 flex font-semibold text-2xl rounded-full mt-5 bg-[#59F8E8] shadow-2xl  hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
        >
          Quit
        </Button>
      </div> */}

      <div
        className="bg-indigo-950 h-screen flex flex-col justify-center items-center bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/assets/images/winning-screen.png')" }}
      >
        <h1 className="text-white uppercase drop-shadow-[0px_2px_5px_rgba(225,225,225)] font-semibold text-3xl sm:text-5xl mt-20 sm:mt-56">
          congratulations!
        </h1>
        <div className="p-12 bg-white w-80 rounded-lg mt-24">
          <img src="/assets/images/winningcup.png" className="size-30 -mt-40" />
          <h1 className="text-xl text-center">You</h1>
          <h2 className="font-semibold text-3xl text-center">Win!</h2>
        </div>
        <Button
          variant="outline"
          className="w-48 p-8 flex font-semibold text-2xl rounded-full mt-14 bg-[#59F8E8] shadow-xl  hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
        >
          Play Again
        </Button>
        <Button
          variant="outline"
          className="w-32 p-5 flex font-semibold text-2xl rounded-full mt-5 bg-[#59F8E8] shadow-2xl  hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
        >
          Quit
        </Button>
      </div>
    </>
  );
};
