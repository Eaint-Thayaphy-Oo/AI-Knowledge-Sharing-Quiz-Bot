import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response || error.message);
      setAlert({ show: true, message: "Error fetching users", type: "error" });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseAlert = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  return (
    <div className="p-6">
      {alert.show && (
        <div
          className={`alert alert-${alert.type} mb-4 flex justify-between items-center`}
        >
          {alert.message}
          <button onClick={handleCloseAlert} className="ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
      </div>
      <table className="w-full text-white">
        <thead className="bg-indigo-950">
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Role</th>
            {/* <th className="px-4 py-2 border-b">Profile Image</th> */}
          </tr>
        </thead>
        <tbody className="bg-[#89e2dc] text-[#1e1b4b]">
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border-b text-center">{user.id}</td>
                <td className="px-4 py-2 border-b text-center">{user.name}</td>
                <td className="px-4 py-2 border-b text-center">{user.email}</td>
                <td className="px-4 py-2 border-b text-center">{user.role}</td>
                {/* <td className="px-4 py-2 border-b text-center">
                  <img
                    src={`/storage/profile_images/${user.profile_image}`}
                    alt="Profile Image"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
