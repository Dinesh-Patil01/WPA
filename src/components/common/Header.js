import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; 

const Header = ({ toggleTheme, isDarkMode }) => (
  <header
    className={`p-6 flex justify-between items-center rounded-b-2xl ${
      isDarkMode
        ? "bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-800 text-white"
        : "bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 text-white"
    } shadow-xl border-b-4 border-transparent hover:border-gray-300 transition-all duration-500 ease-in-out`}
  >
    <h1 className="text-4xl font-extrabold tracking-tight">
      User Management
    </h1>
    <button
      onClick={toggleTheme}
      className="flex items-center bg-white text-gray-800 px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
    >
      {isDarkMode ? (
        <>
          <SunIcon className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  </header>
);

export default Header;
