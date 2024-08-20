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
    // { name: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-full flex flex-col ">
      <div className="flex items-center justify-center p-4">
        {/* <img src="" alt="admin"/><br /> */}
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <ul className="flex flex-col mt-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="cursor-pointer flex items-center p-4"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1e1b4b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
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
