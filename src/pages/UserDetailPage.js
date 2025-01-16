import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../services/userService";
import Spinner from "../components/common/Spinner";
import Error from "../components/common/Error";

const UserDetailPage = ({ isDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserById(id);
        setUser(data);
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <Spinner isDarkMode={isDarkMode} />;
  if (error) return <Error message={error} />;

  return (
    <div
      className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
     
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-6 hover:bg-blue-600 focus:outline-none"
      >
        ← Go Back
      </button>

     
      <div
        className={`max-w-lg mx-auto p-10 rounded-lg shadow-lg border ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-4">{user.name}</h1>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-lg">
            <strong>Company:</strong> {user.company.name}
          </p>
          <p className="text-lg">
            <strong>Website:</strong> <a href={`https://${user.website}`} className="text-blue-500 hover:underline">{user.website}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
