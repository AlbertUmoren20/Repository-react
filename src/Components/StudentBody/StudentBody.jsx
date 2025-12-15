import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaSpinner, FaSync } from "react-icons/fa";
import logo from "../Assets/TU-LOGO-1.png";
import BackButton from "../BackButton/BackButton";
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL
/**
 * Modern StudentBody
 * - Responsive grid
 * - Accessible buttons with aria attributes
 * - Disabled after click to prevent double navigation
 * - Dynamically fetches faculties from API
 */

// Icon mapping for different faculties
const getFacultyIcon = (abbreviation) => {
  const iconMap = {
    FBMAS: "🔬",
    FAMSS: "🎨",
    NURSING: "👩‍⚕️",
  };
  return iconMap[abbreviation?.toUpperCase()] || "📚";
};

// Color accent mapping
const getFacultyAccent = (index) => {
  const accents = [
    "border-blue-400 text-blue-500",
    "border-green-400 text-green-500",
    "border-pink-400 text-pink-500",
    "border-purple-400 text-purple-500",
    "border-yellow-400 text-yellow-500",
    "border-indigo-400 text-indigo-500",
  ];
  return accents[index % accents.length];
};

const StudentBody = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Try to get fullname from localStorage; fallback to 'Student'
  const fullName = new URLSearchParams(location?.search).get("fullName");
  const userLevel = new URLSearchParams(location?.search).get("userLevel");

  
  // Fetch faculties from API
  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/getFaculties`);
      if (response.ok) {
        const data = await response.json();
        const facultiesList = Array.isArray(data) ? data : [];
        
        // Transform API data to match component structure
        const transformedFaculties = facultiesList.map((faculty, index) => ({
          id: faculty.id || faculty.abbreviation?.toLowerCase() || `faculty-${index}`,
          title: faculty.abbreviation || faculty.name?.substring(0, 10) || "FACULTY",
          subtitle: faculty.name || faculty.description || "",
          path: `/Faculty/${faculty.abbreviation || faculty.id}`,
          abbreviation: faculty.abbreviation,
          accent: getFacultyAccent(index),
        }));
        
        setFaculties(transformedFaculties);
      } else {
        // Fallback to default faculties if API fails
        setFaculties([
          {
            id: "fbmas",
            title: "FBMAS",
            subtitle: "Faculty of Basic Medical and Applied Sciences",
            path: "/Faculty/FBMAS",
            abbreviation: "FBMAS",
            accent: "border-blue-400 text-blue-500",
          },
          {
            id: "famss",
            title: "FAMSS",
            subtitle: "Faculty of Art Management and Social Sciences",
            path: "/Faculty/FAMSS",
            abbreviation: "FAMSS",
            accent: "border-green-400 text-green-500",
          },
          {
            id: "nursing",
            title: "NURSING",
            subtitle: "Faculty of Nursing",
            path: "/Faculty/NURSING",
            abbreviation: "NURSING",
            accent: "border-pink-400 text-pink-500",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
      // Fallback to default faculties on error
      setFaculties([
        {
          id: "fbmas",
          title: "FBMAS",
          subtitle: "Faculty of Basic Medical and Applied Sciences",
          path: "/Faculty/FBMAS",
          abbreviation: "FBMAS",
          accent: "border-blue-400 text-blue-500",
        },
        {
          id: "famss",
          title: "FAMSS",
          subtitle: "Faculty of Art Management and Social Sciences",
          path: "/Faculty/FAMSS",
          abbreviation: "FAMSS",
          accent: "border-green-400 text-green-500",
        },
        {
          id: "nursing",
          title: "NURSING",
          subtitle: "Faculty of Nursing",
          path: "/Faculty/NURSING",
          abbreviation: "NURSING",
          accent: "border-pink-400 text-pink-500",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // OPTIONAL: redirect to login if no name at all (uncomment if desired)
  // useEffect(() => {
  //   if (!localStorage.getItem("userFullname")) navigate("/login");
  // }, [navigate]);

  const handleNavigate = useCallback(
    (path) => {
      if (clicked) return; // safety guard
      setClicked(true);
      navigate(path);
    },
    [clicked, navigate]
  );

  const handleLogout = () => {
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userLevel");
    localStorage.removeItem("userRole");
    navigate("/Register");
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      <BackButton />
      {/* header */}
      <header className="flex flex-col items-center">
        <img
          src={logo}
          alt="School logo"
          className="w-full h-24 mb-4 object-cover"
        />

        <h1 className="text-gray-700 text-2xl sm:text-3xl font-semibold text-center">
          Welcome,
        </h1>

        <p
          className="mt-1 text-3xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-400 text-center"
          aria-label={`Welcome ${fullName}`}
        >
          {fullName}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Choose your faculty to continue
        </p>
      </header>
      <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
      {/* faculty selection */}
      <section
        className="mt-10 w-full max-w-4xl text-center"
        aria-labelledby="faculty-heading"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="faculty-heading" className="text-2xl font-bold text-gray-800">
            What Faculty?
          </h2>
          <button
            onClick={fetchFaculties}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            title="Refresh faculties list"
          >
            <FaSync className={isLoading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin w-8 h-8 text-blue-500" />
            <span className="ml-3 text-gray-600">Loading faculties...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
            {faculties.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No faculties available
              </div>
            ) : (
              faculties.map(({ id, title, subtitle, path, abbreviation, accent }) => (
                <button
                  key={id}
                  onClick={() => handleNavigate(path)}
                  disabled={clicked}
                  aria-pressed={clicked}
                  className={`relative flex flex-col items-start gap-3 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 bg-white border-t-4 ${accent}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span
                      className={`p-3 rounded-md bg-white/80 border text-2xl`}
                      aria-hidden
                    >
                      {getFacultyIcon(abbreviation)}
                    </span>

                    <div className="text-left">
                      <h3 className={`text-xl font-semibold ${accent.split(" ")[1]}`}>
                        {title}
                      </h3>
                      <p className="mt-1 text-gray-600 text-sm leading-tight">{subtitle}</p>
                    </div>
                  </div>

                  {/* subtle CTA */}
                  <span className="mt-3 text-xs text-gray-400">Tap to continue →</span>

                  {/* simple disabled overlay so state is obvious when clicked */}
                  {clicked && (
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-white/60 rounded-xl pointer-events-none"
                    />
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default StudentBody;
