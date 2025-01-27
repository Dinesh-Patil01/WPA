import React from "react";

const Spinner = ({ isDarkMode }) => (
  <div
    className={`flex justify-center items-center min-h-screen ${
      isDarkMode ? "bg-gray-900" : "bg-gray-100"
    }`}
  >
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

export default Spinner;
