import React from "react";
import {
  Home,
  Users,
  Settings,
  KeySquare,
  BarChart4,
  ShieldQuestion,
  Blend,
} from "lucide-react";

const Sidebar = ({ setSelectedMenuItem }) => {
  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Users", icon: Users },
    { name: "Categories", icon: BarChart4 },
    { name: "Questions", icon: ShieldQuestion },
    { name: "Score", icon: Blend },
    { name: "Change Password", icon: KeySquare },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-full p-4">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className=" text-white py-2 cursor-pointer flex items-center"
            onClick={() => setSelectedMenuItem(item.name)}
          >
            <item.icon className="mr-2" />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
