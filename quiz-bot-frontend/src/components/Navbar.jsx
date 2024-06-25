import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="text-white text-xl">Admin Dashboard</div>
      <div>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded">
          <Link to="/">Logout</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
