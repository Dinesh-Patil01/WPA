import React from "react";

const Pagination = ({ totalUsers, usersPerPage, currentPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

 
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentPage === number
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
