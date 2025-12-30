import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartBar, FaFolderOpen, FaCog, FaSignOutAlt } from "react-icons/fa";
import FacultyManagement from "./FacultyManagement";
import ProjectStatistics from "./ProjectStatistics";
import ProjectManagement from "./ProjectManagement";
import BackButton from "../BackButton/BackButton";
import logo from "../Assets/Ellipse 2.png";
import { FacultyProvider } from "../../Contexts/FacultyContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("faculties");
  const navigate = useNavigate();
  
  const adminName = localStorage.getItem("userFullname") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userLevel");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/Register");
  };

  const tabs = [
    { id: "faculties", label: "Faculty Management", icon: FaUsers },
    { id: "statistics", label: "Project Statistics", icon: FaChartBar },
    { id: "projects", label: "Project Management", icon: FaFolderOpen },
  ];

  return (
    <FacultyProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <BackButton />
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">Welcome, {adminName}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition ${
                    activeTab === id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "faculties" && <FacultyManagement />}
          {activeTab === "statistics" && <ProjectStatistics />}
          {activeTab === "projects" && <ProjectManagement />}
        </main>
      </div>
    </FacultyProvider>
  );
};

export default AdminDashboard;

