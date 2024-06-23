import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function Invite() {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
      >
        <div className="flex items-center text-lg sm:text-xl md:text-2xl font-bold text-white mb-10 sm:mb-20 p-5">
          <Link to="/home" className="flex items-center">
            <ArrowLeft color="white" className="mr-3 mt-1" />{" "}
            Invite a Friend
          </Link>
        </div>
        <div className="bg-white p-6 w-80 sm:w-80 md:w-96 rounded-md mx-auto">
          <div className="flex">
            <Input placeholder="Enter username" className="w-40" />
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-7 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <p className="text-[#706e6e] mt-10">Recently Played</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="bg-[#d3d1d1] rounded-full w-10 h-10 border-2 flex items-center justify-center">
              <UserRound className="mx-auto" />
            </div>
            <p>Player 1</p>
            <Button
              variant="outline"
              className="w-20 sm:w-36 ml-16 items-center justify-center font-bold rounded-md bg-[#59F8E8] hover:drop-shadow-[0px_2px_5px_rgba(225,225,225)]"
            >
              Invite
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
