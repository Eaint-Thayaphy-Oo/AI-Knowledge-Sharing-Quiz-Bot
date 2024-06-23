import React, { useState } from "react";
import { UserRound } from "lucide-react";

export const QuizHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* <div className="bg-indigo-950 text-center">
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
      <div className="flex flex-col items-center">
        <button
          onClick={openForm}
          className="bg-gray-700 text-white py-4 px-6 rounded-lg fixed bottom-4 right-4"
        >
          Chat
        </button>

        {isOpen && (
          <div className="chat-popup fixed bottom-0 right-4 border-2 border-gray-300 bg-white p-4 w-80">
            <form action="/action_page.php" className="form-container">
              <h1>Chat</h1>

              <label htmlFor="msg" className="block mb-2">
                <b>Message</b>
              </label>
              <textarea
                className="w-full p-4 mb-4 bg-gray-200 rounded"
                placeholder="Type message.."
                name="msg"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-green-500 text-white py-4 px-6 rounded w-full mb-2"
              >
                Send
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="bg-red-500 text-white py-4 px-6 rounded w-full"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div> */}

      <div className="bg-indigo-950 text-center min-h-screen flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-[#59F8E8] mb-10 text-2xl sm:text-3xl">Level 1</h1>
          <p className="text-white font-semibold text-lg sm:text-xl mb-10">
            What does HTML stand for?
          </p>
          <div className="w-3/4 bg-white h-2 rounded mx-auto"></div>
          <div className="flex justify-between mt-10 mb-10 px-5">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full w-10 h-10 border-[#59F8E8] border-2 flex items-center justify-center">
                <UserRound className="mx-auto" />
              </div>
              <span className="text-white mt-2">10</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full w-10 h-10 border-[#FF8585] border-2 flex items-center justify-center">
                <UserRound className="mx-auto" />
              </div>
              <span className="text-white mt-2">10</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-full rounded-t-[50px] p-10">
          <h1 className="text-end">5/30</h1>
          <div className="bg-slate-100 drop-shadow-xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full mx-auto p-5 mt-10">
            Hyper Text Markup Language
          </div>
          <div className="bg-slate-100 drop-shadow-xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full mx-auto p-5 mt-10">
            Hyperlinks and Text Markup Language
          </div>
          <div className="bg-[#7CF979] drop-shadow-xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full mx-auto p-5 mt-10">
            Hypertext Markup Language
          </div>
          <div className="bg-slate-100 drop-shadow-xl w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-full mx-auto p-5 mt-10">
            Home Tool Markup Language
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={openForm}
          className="bg-gray-700 text-white py-4 px-6 rounded-lg fixed bottom-4 right-4"
        >
          Chat
        </button>

        {isOpen && (
          <div className="chat-popup fixed bottom-0 right-4 border-2 border-gray-300 bg-white p-4 w-72 sm:w-80">
            <form action="/action_page.php" className="form-container">
              <h1>Chat</h1>

              <label htmlFor="msg" className="block mb-2">
                <b>Message</b>
              </label>
              <textarea
                className="w-full p-4 mb-4 bg-gray-200 rounded"
                placeholder="Type message.."
                name="msg"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-green-500 text-white py-4 px-6 rounded w-full mb-2"
              >
                Send
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="bg-red-500 text-white py-4 px-6 rounded w-full"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
