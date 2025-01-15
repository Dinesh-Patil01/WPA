import React, { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";
import UserCard from "../components/users/UserCard";
import Spinner from "../components/common/Spinner";
import Error from "../components/common/Error";

const HomePage = ({ isDarkMode }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);  // Display 6 users per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // if (loading) return <Spinner />;
 
  if (loading) return <Spinner isDarkMode={isDarkMode} />;

  if (error) return <Error message={error} />;

  return (
    <div
      className={`min-h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="mb-4 flex justify-between items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border p-2 rounded w-1/3 ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />

        {/* Sort Button */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mx-auto max-w-7xl">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} isDarkMode={isDarkMode} />
        ))}
      </div>

      {/* Fixed Pagination */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ←
        </button>

        {/* Page Number */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-300 text-black font-semibold">
          {currentPage}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default HomePage;
