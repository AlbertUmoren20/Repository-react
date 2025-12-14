// Nursing.jsx
import React from "react";
import logo from "../Assets/Ellipse 2.png";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

export default function Nursing() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white p-6">
      <BackButton />
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <img src={logo} alt="logo" className="w-16 h-16 mx-auto rounded-full mb-4" />
        <h1 className="text-3xl font-bold mb-2">Nursing — Not Available</h1>
        <p className="text-sm text-gray-500 mb-6">
          The Nursing faculty repository is not yet available. You can either upload a project (if permitted)
          or check back later.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/contact-admin")}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Contact Admin
          </button>
          <button
            onClick={() => navigate("/AttachProjectNursing")}
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
          >
            Upload Project
          </button>
        </div>
      </div>
    </main>
  );
}
