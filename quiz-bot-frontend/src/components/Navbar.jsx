import React from "react";

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mx-auto">Admin Dashboard</h1>
          <button className="px-4 py-2 text-[#1e1b4b] bg-[#59F8E8] rounded">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
