import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="bg-red-400 flex flex-col justify-center h-screen text-center">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="mx-auto mb-10"
        />
        <p className="text-xl font-bold text-white mb-20">
          Let's Play Some Quiz
        </p>
        <div className="bg-white p-3 w-80 rounded-[20px] mx-auto">
          <p className="font-bold text-2xl mt-8 mb-12">
            Enter Room ID <br />
            To Join The Game
          </p>
          <Input placeholder="Enter Room ID" className="w-36 mx-auto" />
          <Button
            variant="outline"
            className="w-36 p-6 flex font-bold rounded-full -mb-8 mt-14 ml-20 bg-[#59F8E8]"
          >
            Next <ArrowRight color="grey" className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
}
