import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200"
      aria-label="Go back"
    >
      <FaArrowLeft className="text-gray-700" />
      <span className="text-gray-700 font-medium">Back</span>
    </button>
  );
};

export default BackButton;

