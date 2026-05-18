import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <Routes>

        {/* Login - No Dark Mode */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* Jobs */}
        <Route
          path="/jobs"
          element={
            <Jobs
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* Candidates */}
        <Route
          path="/candidates"
          element={
            <Candidates
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;