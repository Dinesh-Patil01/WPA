import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.className = isDarkMode ? "" : "dark";
  };

  return (
    <Router>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
        <Route path="/user/:id" element={<UserDetailPage isDarkMode={isDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;