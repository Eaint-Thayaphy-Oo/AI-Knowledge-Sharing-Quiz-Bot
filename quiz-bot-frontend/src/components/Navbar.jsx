import { SunMoon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleTheme }) => {
  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-end space-x-4">
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="flex px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600 transition"
          >
            <SunMoon className="mr-2"/>
            Toggle Theme
          </button>

          {/* Logout Button */}
          <button className="px-4 py-2 text-[#1e1b4b] bg-[#59F8E8] rounded">
            <Link to="/">Logout</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
