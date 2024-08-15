import React from "react";
import { useNavigate } from "react-router-dom";

export const CategoryHome = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      icon: <img src="/assets/images/rocket.png" />,
      label: "general knowledge",
    },
    { id: 2, icon: <img src="/assets/images/science.png" />, label: "science" },
    { id: 3, icon: <img src="/assets/images/IT.png" />, label: "IT" },
    {
      id: 4,
      icon: <img src="/assets/images/computer.png" />,
      label: "web development",
    },
    { id: 5, icon: <img src="/assets/images/medal.png" />, label: "history" },
    {
      id: 6,
      icon: <img src="/assets/images/music.png" />,
      label: "entertainment",
    },
    { id: 7, icon: <img src="/assets/images/target.png" />, label: "sports" },
    {
      id: 8,
      icon: <img src="/assets/images/setting.png" />,
      label: "education",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/quiz?category_id=${categoryId}`);
  };

  return (
    <>
      {/* <div className="bg-indigo-950 flex flex-col justify-center h-screen">
        <div className="text-white">user account</div>
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
      </div> */}
      <div className="bg-indigo-950 flex flex-col justify-center min-h-screen p-4">
        <h1 className="text-center uppercase text-white font-light mb-8">
          choose <br />
          <span className="text-2xl font-bold">category</span>
        </h1>
        <div className="md:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 w-72 rounded-2xl mx-auto flex flex-col items-center mb-10"
              onClick={() => handleCategoryClick(item.id)}
            >
              <div className="-mt-14 ml-48 w-20">{item.icon}</div>
              <p className="text-2xl font-semibold capitalize flex justify-center items-center pt-2 text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
