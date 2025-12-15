// Generic FacultyStudent component that works with any faculty
import React from "react";
import { useParams } from "react-router-dom";
import ProjectRepo from "../ProjectRepo/ProjectRepo";
import logo from "../Assets/Ellipse 2.png";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// Default departments and years - can be customized per faculty or fetched from API
const defaultDepartments = {
  FBMAS: ["Computer Science", "Information science", "Biotech", "Microbiology", "Medical lab.", "BioChemistry"],
  FAMSS: ["Mass Communication", "Economics", "Business Admin", "Accounting", "Inter rel.", "Political Science"],
  NURSING: ["Nursing"],
};

const defaultYears = [2022, 2023, 2024, 2025, 2026];

// API endpoint mapping - can be made dynamic if backend supports it
const fetchUrlMap = {
  FBMAS: `${API_BASE_URL}/student/getFbmasUpload`,
  FAMSS: `${API_BASE_URL}/student/getFamssUpload`,
  NURSING: `${API_BASE_URL}/student/getNursingUpload`,
};

// Use dynamic route for all faculties
const getAttachPath = (abbreviation) => {
  return `/AttachedProject?faculty=${abbreviation}`;
};
export default function FacultyStudent() {
  const { facultyAbbr } = useParams();
  const abbreviation = facultyAbbr?.toUpperCase() || "";

  // Get faculty-specific data or use defaults
  const departments = defaultDepartments[abbreviation] || [];
  // fetchUrlMap[abbreviation] ||
  const fetchUrl =  `${API_BASE_URL}/student/getUpload/${abbreviation}`;
  const attachPath = getAttachPath(abbreviation);

  // Fetch faculty details from API to get proper name
  const [facultyName, setFacultyName] = React.useState(abbreviation);
  const [facultyDescription, setFacultyDescription] = React.useState("");

  React.useEffect(() => {
    // Fetch faculty details
    const fetchFacultyDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/getFaculties`);
        if (response.ok) {
          const faculties = await response.json();
          const faculty = Array.isArray(faculties)
            ? faculties.find((f) => f.abbreviation?.toUpperCase() === abbreviation.toUpperCase())
            : null;
          if (faculty) {
            setFacultyName(faculty.abbreviation || abbreviation);
            setFacultyDescription(faculty.name || faculty.description || "");
          } else {
            // If faculty not found, use abbreviation as name
            setFacultyName(abbreviation);
            setFacultyDescription(`${abbreviation} Repository`);
          }
        } else {
          // Use fallback names if API fails
          const fallbackNames = {
            FBMAS: "Faculty of Basic Medical and Applied Sciences",
            FAMSS: "Faculty of Art Management and Social Sciences",
            NURSING: "Faculty of Nursing",
          };
          setFacultyName(abbreviation);
          setFacultyDescription(fallbackNames[abbreviation.toUpperCase()] || `${abbreviation} Repository`);
        }
      } catch (error) {
        console.error("Error fetching faculty details:", error);
        // Use fallback names
        const fallbackNames = {
          FBMAS: "Faculty of Basic Medical and Applied Sciences",
          FAMSS: "Faculty of Art Management and Social Sciences",
          NURSING: "Faculty of Nursing",
        };
        setFacultyName(abbreviation);
        setFacultyDescription(fallbackNames[abbreviation.toUpperCase()] || `${abbreviation} Repository`);
      }
    };

    if (abbreviation) {
      fetchFacultyDetails();
    }
  }, [abbreviation]);

  return (
    <ProjectRepo
      title={`${facultyName} E-REPOSITORY`}
      subtitle={facultyDescription || `${abbreviation} Repository`}
      fetchUrl={fetchUrl}
      departments={departments}
      years={defaultYears}
      attachPath={attachPath}
      logo={logo}
    />
  );
}

