import React from "react";
import {
  PieChart,
  BriefcaseBusiness,
  TrendingUp,
  Heart,
  Earth,
  BookOpen,
} from "lucide-react";

export const CategoryHome = () => {
  const items = [
    {
      icon: <PieChart color="#a1a1a1" />,
      label: "general knowledge",
    },
    {
      icon: <BriefcaseBusiness color="#a1a1a1" />,
      label: "science",
    },
    {
      icon: <TrendingUp color="#a1a1a1" />,
      label: "IT",
    },
    {
      icon: <Heart color="#a1a1a1" />,
      label: "web development",
    },
    {
      icon: <Earth color="#a1a1a1" />,
      label: "history",
    },
    {
      icon: <BookOpen color="#a1a1a1" />,
      label: "entertainment",
    },
    {
      icon: <Earth color="#a1a1a1" />,
      label: "sports",
    },
    {
      icon: <BookOpen color="#a1a1a1" />,
      label: "education",
    },
  ];

  return (
    <>
      <div className="bg-indigo-950 flex flex-col justify-center h-screen">
        <h1 className="text-center uppercase text-white font-light mb-20">
          choose <br />
          <span className="text-2xl font-bold">category</span>
        </h1>
        <div className="grid grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 w-72 rounded-[20px] mx-auto mb-10"
            >
              <div className="-mt-10 ml-48">{item.icon}</div>
              <p className="text-2xl font-semibold capitalize flex justify-center items-center pt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
