import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`p-8 border rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-200"}`}
      onClick={() => navigate(`/user/${user.id}`)}
    >
      <h2 className="font-bold text-lg">{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
    </div>
  );
};

export default UserCard;