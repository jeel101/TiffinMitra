import React from "react";
import { useNavigate } from "react-router-dom";

const GoToStreamlitButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#A42A20] text-white px-6 py-3 rounded-md hover:bg-red-800 transition duration-300"
    >
      Smart Meal Finder
    </button>
  );
};

export default GoToStreamlitButton;
