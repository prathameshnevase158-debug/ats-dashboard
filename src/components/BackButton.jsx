import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const routeOrder = [
  "/",
  "/dashboard",
  "/jobs",
  "/candidates",
];

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    const currentIndex = routeOrder.indexOf(location.pathname);

    if (currentIndex > 0) {
      navigate(routeOrder[currentIndex - 1]);
    }
  };

  return (
    <button
      className="btn btn-secondary mb-3"
      onClick={handleBack}
      disabled={location.pathname === "/"}
    >
      ← Back
    </button>
  );
};

export default BackButton;