import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUpload, FaFileAlt, FaSpinner, FaTrash, FaEye } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import axios from "axios";
import logo from "../Assets/Ellipse 2.png";
import BackButton from "../BackButton/BackButton";
import FileViewer from "../FileViewer/FileViewer";
import API_ENDPOINTS, { getFileUrl } from "../../config/api";

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [circulars, setCirculars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileViewerOpen, setFileViewerOpen] = useState(false);
  const [selectedCircular, setSelectedCircular] = useState(null);
  const navigate = useNavigate();
  
  const lecturerName = localStorage.getItem("userFullname") || "Lecturer";
  const lecturerEmail = localStorage.getItem("userEmail") || "";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    file: null,
  });

  useEffect(() => {
    if (activeTab === "view") {
      fetchCirculars();
    }
  }, [activeTab]);

  const fetchCirculars = async () => {
    setIsLoading(true);
    try {
      // Try fetching with lecturer email filter first
      let response = await fetch(`${API_ENDPOINTS.GET_CIRCULARS}?lecturerEmail=${encodeURIComponent(lecturerEmail)}`);
      
      if (!response.ok && response.status === 404) {
        // If endpoint with query param doesn't exist, try without
        response = await fetch(API_ENDPOINTS.GET_CIRCULARS);
      }
      
      if (response.ok) {
        const data = await response.json();
        let circularsList = Array.isArray(data) ? data : [];
        
        // If we got all circulars, filter by lecturer
        if (lecturerEmail || lecturerName) {
          circularsList = circularsList.filter(c => {
            const matchesEmail = c.lecturerEmail && c.lecturerEmail.toLowerCase() === lecturerEmail.toLowerCase();
            const matchesName = c.lecturerName && c.lecturerName.toLowerCase() === lecturerName.toLowerCase();
            const matchesUploadedBy = c.uploadedBy && c.uploadedBy.toLowerCase() === lecturerName.toLowerCase();
            return matchesEmail || matchesName || matchesUploadedBy;
          });
        }
        
        // Normalize file paths in circulars
        circularsList = circularsList.map(circular => {
          // Ensure file path is properly formatted
          if (circular.file && !circular.fileUrl && !circular.filePath) {
            // If file is just a filename, construct path
            if (!circular.file.startsWith("http") && !circular.file.startsWith("/")) {
              circular.filePath = `/uploads/circulars/${circular.file}`;
            } else if (circular.file.startsWith("/")) {
              circular.filePath = circular.file;
            }
          }
          return circular;
        });
        
        setCirculars(circularsList);
      } else {
        console.warn("Failed to fetch circulars:", response.status, response.statusText);
        setCirculars([]);
      }
    } catch (error) {
      console.error("Error fetching circulars:", error);
      toast.error("Failed to load circulars. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
      setCirculars([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast.error("Please select a file to upload", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("year", formData.year);
    uploadData.append("file", formData.file);
    uploadData.append("lecturerName", lecturerName);
    uploadData.append("lecturerEmail", lecturerEmail);

    try {
      const response = await axios.post(API_ENDPOINTS.UPLOAD_CIRCULAR, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Circular uploaded successfully!", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        year: "",
        file: null,
      });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      // Refresh circulars list if on view tab
      if (activeTab === "view") {
        setTimeout(() => fetchCirculars(), 1000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload circular. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userLevel");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/Register");
  };

  const handleViewFile = (circular) => {
    // Construct file URL from various possible fields
    let fileUrl = null;
    
    // Priority order: fileUrl > filePath > file > id-based endpoint > url
    if (circular.fileUrl) {
      fileUrl = circular.fileUrl;
    } else if (circular.filePath) {
      fileUrl = getFileUrl(circular.filePath);
    } else if (circular.file) {
      fileUrl = getFileUrl(circular.file);
    } else if (circular.id) {
      // If we have an ID, try to fetch via API endpoint
      fileUrl = API_ENDPOINTS.GET_FILE(circular.id);
    } else if (circular.url) {
      fileUrl = circular.url;
    }

    if (fileUrl) {
      console.log("Opening file with URL:", fileUrl);
      setSelectedCircular({ ...circular, computedFileUrl: fileUrl });
      setFileViewerOpen(true);
    } else {
      console.error("No file URL found for circular:", circular);
      toast.error("File not available. The file path is missing from the database record.", {
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  const tabs = [
    { id: "upload", label: "Upload Circular", icon: FaUpload },
    { id: "view", label: "My Circulars", icon: FaFileAlt },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <BackButton />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lecturer Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {lecturerName}</p>
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
        {activeTab === "upload" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upload New Circular/Thesis</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter circular/thesis title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description/Abstract
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter description or abstract of your circular/thesis"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File (PDF/DOC)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaUpload />
                    <span>Upload Circular</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === "view" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">My Circulars/Thesis</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <FaSpinner className="animate-spin w-8 h-8 text-blue-500" />
                <span className="ml-3 text-gray-600">Loading circulars...</span>
              </div>
            ) : circulars.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaFileAlt className="mx-auto text-6xl text-gray-300 mb-4" />
                <p className="text-lg">No circulars uploaded yet</p>
                <p className="text-sm mt-2">Upload your first circular using the "Upload Circular" tab</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {circulars.map((circular, index) => (
                  <div
                    key={circular.id || index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                      {circular.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {circular.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Year: {circular.year || "N/A"}</span>
                      <span>{circular.uploadDate ? new Date(circular.uploadDate).toLocaleDateString() : ""}</span>
                    </div>
                    <button
                      onClick={() => handleViewFile(circular)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaEye />
                      <span>View File</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* File Viewer */}
      {fileViewerOpen && selectedCircular && (
        <FileViewer
          fileUrl={
            selectedCircular.computedFileUrl ||
            selectedCircular.fileUrl || 
            selectedCircular.filePath || 
            selectedCircular.file || 
            selectedCircular.url ||
            (selectedCircular.id ? API_ENDPOINTS.GET_FILE(selectedCircular.id) : null)
          }
          fileName={selectedCircular.title || selectedCircular.fileName || "Circular File"}
          onClose={() => {
            setFileViewerOpen(false);
            setSelectedCircular(null);
          }}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default LecturerDashboard;

