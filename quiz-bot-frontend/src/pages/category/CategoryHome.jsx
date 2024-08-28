import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CategoryHome = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const segments = path.split("/");
  const roomId = segments.pop() || segments.pop();

  const items = [
    {
      id: 1,
      icon: <img src="/assets/images/rocket.png" alt="rocket" />,
      label: "general knowledge",
    },
    {
      id: 2,
      icon: <img src="/assets/images/science.png" alt="science" />,
      label: "science",
    },
    { id: 3, icon: <img src="/assets/images/IT.png" alt="IT" />, label: "IT" },
    {
      id: 4,
      icon: <img src="/assets/images/computer.png" alt="web development" />,
      label: "web development",
    },
    {
      id: 5,
      icon: <img src="/assets/images/medal.png" alt="history" />,
      label: "history",
    },
    {
      id: 6,
      icon: <img src="/assets/images/music.png" alt="entertainment" />,
      label: "entertainment",
    },
    {
      id: 7,
      icon: <img src="/assets/images/target.png" alt="sports" />,
      label: "sports",
    },
    {
      id: 8,
      icon: <img src="/assets/images/setting.png" alt="education" />,
      label: "education",
    },
  ];

  const handleCategoryClick = async (categoryId) => {
    const res = await axios.patch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/update-room-category/${roomId}/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res) {
      console.log(res);
    }
    navigate(`/quiz?category_id=${categoryId}`);
  };

  return (
    <div className="bg-indigo-950 flex flex-col justify-center min-h-screen p-4">
      <h1 className="text-center uppercase text-white font-light mb-8">
        choose <br />
        <span className="text-2xl font-bold">category</span>
      </h1>
      <div className="md:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-8 w-72 rounded-2xl mx-auto flex flex-col items-center mb-10 cursor-pointer"
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
  );
};
