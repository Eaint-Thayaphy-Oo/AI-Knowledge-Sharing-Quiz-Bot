import React from "react";
import { UserRound } from "lucide-react";

export const QuizHome = () => {
  return (
    <>
      <div className="bg-indigo-950 text-center">
        <h1 className="text-[#59F8E8] mb-10">Level 1</h1>
        <p className="text-white font-semibold text-xl mb-10">
          What does HTML stand for?
        </p>
        <div className="w-56 bg-white h-2 rounded mx-auto"></div>
        <div className="flex place-content-evenly mt-10 mb-10">
          <div className="bg-white rounded-full size-10 border-[#59F8E8] border-2 flex flex-col justify-center">
            <UserRound className="mx-auto" />
          </div>
          <div className="bg-white rounded-full size-10 border-[#FF8585] border-2 flex flex-col justify-center">
            <UserRound className="mx-auto" />
          </div>
        </div>
        <div className="bg-white w-full rounded-t-[50px] p-10">
          <h1 className="text-end">5/30</h1>
          <div className="bg-slate-100 drop-shadow-xl w-96 rounded-full mx-auto p-5 mt-10">
            Hyper Trainer Marking Language
          </div>
          <div className="bg-slate-100 drop-shadow-xl w-96 rounded-full mx-auto p-5 mt-10">
            Hyper Trainer Marking Language
          </div>
          <div className="bg-[#7CF979] drop-shadow-xl w-96 rounded-full mx-auto p-5 mt-10">
            Hyper Trainer Marking Language
          </div>
          <div className="bg-slate-100 drop-shadow-xl w-96 rounded-full mx-auto p-5 mt-10">
            Hyper Trainer Marking Language
          </div>
        </div>
      </div>
    </>
  );
};
