import React from "react";

export const CategoryHome = () => {
  const items = [
    {
      icon: <img src="/assets/images/rocket.png" />,
      label: "general knowledge",
    },
    {
      icon: <img src="/assets/images/science.png" />,
      label: "science",
    },
    {
      icon: <img src="/assets/images/IT.png" />,
      label: "IT",
    },
    {
      icon: <img src="/assets/images/computer.png" />,
      label: "web development",
    },
    {
      icon: <img src="/assets/images/medal.png" />,
      label: "history",
    },
    {
      icon: <img src="/assets/images/music.png" />,
      label: "entertainment",
    },
    {
      icon: <img src="/assets/images/target.png" />,
      label: "sports",
    },
    {
      icon: <img src="/assets/images/setting.png" />,
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
              <div className="-mt-14 ml-48 w-20">{item.icon}</div>
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
