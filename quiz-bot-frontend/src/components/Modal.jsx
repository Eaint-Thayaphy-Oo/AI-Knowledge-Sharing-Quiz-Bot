import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
