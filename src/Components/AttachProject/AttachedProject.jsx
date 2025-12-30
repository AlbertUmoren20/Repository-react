import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import BackButton from "../BackButton/BackButton";
import { useNavigate, useSearchParams } from 'react-router-dom';
import API_ENDPOINTS from "../../config/api";

// Default departments per faculty - can be fetched from API in the future
const defaultDepartments = {
  FBMAS: ["Computer Science", "Information Science", "Biotech", "Microbiology", "Medical lab.", "BioChemistry"],
  FAMSS: ["Mass Communication", "Economics", "Business Admin", "Accounting", "Inter rel.", "Political Science"],
  NURSING: ["Nursing"],
};

// Upload endpoint mapping - supports dynamic faculty
const getUploadEndpoint = (facultyAbbr) => {
  const upperAbbr = facultyAbbr?.toUpperCase() || "";
  const endpointMap = {
    FBMAS: API_ENDPOINTS.UPLOAD_FBMAS,
    FAMSS: API_ENDPOINTS.UPLOAD_FAMSS,
    NURSING: API_ENDPOINTS.UPLOAD_NURSING,
  };
  
  // If faculty exists in map, use it; otherwise use generic endpoint
  return endpointMap[upperAbbr] || API_ENDPOINTS.UPLOAD_GENERIC(upperAbbr);
};

// Color mapping for header decoration
const getHeaderColor = (facultyAbbr) => {
  const upperAbbr = facultyAbbr?.toUpperCase() || "";
  const colorMap = {
    FBMAS: "#f97777",
    FAMSS: "#83D0FC",
    NURSING: "#a78bfa",
  };
  return colorMap[upperAbbr] || "#60a5fa";
};

const AttachedProject = () => {
  const [formData, setFormData] = useState({});
  const [facultyAbbr, setFacultyAbbr] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get faculty from URL search params (e.g., ?faculty=FBMAS)
    const facultyFromUrl = searchParams.get('faculty') || "";
    const upperAbbr = facultyFromUrl.toUpperCase();
    
    if (upperAbbr) {
      setFacultyAbbr(upperAbbr);
      setDepartments(defaultDepartments[upperAbbr] || []);
      
      // Fetch faculty details to get proper name
      fetchFacultyDetails(upperAbbr);
    } else {
      // If no faculty in URL, try to get from localStorage or redirect
      toast.error("No faculty selected. Redirecting...");
      setTimeout(() => navigate('/StudentBody'), 2000);
    }
  }, [searchParams, navigate]);

  const fetchFacultyDetails = async (abbreviation) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_FACULTIES);
      if (response.ok) {
        const faculties = await response.json();
        const faculty = Array.isArray(faculties)
          ? faculties.find((f) => f.abbreviation?.toUpperCase() === abbreviation.toUpperCase())
          : null;
        if (faculty) {
          setFacultyName(faculty.name || faculty.abbreviation || abbreviation);
        } else {
          setFacultyName(abbreviation);
        }
      } else {
        setFacultyName(abbreviation);
      }
    } catch (error) {
      console.error("Error fetching faculty details:", error);
      setFacultyName(abbreviation);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!facultyAbbr) {
      toast.error("Faculty not selected. Please go back and select a faculty.");
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('supervisor', formData.supervisor);
    data.append('projectBy', formData.projectBy);
    data.append('department', formData.department);
    data.append('description', formData.description);
    data.append('file', formData.file);
    data.append('faculty', facultyAbbr); // Include faculty in form data

    try {
      const uploadEndpoint = getUploadEndpoint(facultyAbbr);
      const response = await axios.post(uploadEndpoint, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setTimeout(() => {
        toast.success("Project uploaded successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }, 1000);
      setTimeout(() => {
        navigate(`/Faculty/${facultyAbbr}`);
      }, 2000);
    } catch (error) {
      console.error('There was an error uploading the project!', error);
      toast.error("Project upload failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (!facultyAbbr) {
    return (
      <div>
        <BackButton />
        <div className="text-center py-12">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const headerColor = getHeaderColor(facultyAbbr);
  const years = [2022, 2023, 2024, 2025, 2026];

  return (
    <div>
      <BackButton />
      <div className="HomeHeader" style={{ fontSize: "30px", textDecoration: `underline ${headerColor} 10px` }}>
        UPLOAD {facultyAbbr} <br/> PROJECT
      </div>

      <div className="Rectangle-attach">
        <div className="input-box-attach">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label className='address'>Name:</label>
              </div>
              <div className="col-75">
                <input type="text" name="projectBy" value={formData.projectBy || ""} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-25"> 
                <label className='address'>Year:</label>
              </div>
              <div className="col-75">
                <select name="year" value={formData.year || ""} onChange={handleChange} required>
                  <option value="">Pick Year....</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25"> 
                <label className='address'>Supervisor:</label>
              </div>
              <div className="col-75">
                <input type="text" name="supervisor" value={formData.supervisor || ""} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-25"> 
                <label className='address'>Project Name</label>
              </div>
              <div className="col-75">
                <input type="text" name="title" value={formData.title || ""} onChange={handleChange} required />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className='address'>Department:</label>
              </div>
              <div className="col-75">
              {/* required */}
                <select name="department" value={formData.department || ""} onChange={handleChange} >
                  <option value="">Pick Department....</option>
                  {departments?.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className='address'>Abstract Of Project:</label>
              </div>
              <div className="col-75">
                <textarea name="description" value={formData.description || ""} onChange={handleChange} required></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-25">    
                <label className='address'>PDF File:</label>
              </div>
              <div className="col-75">
                <input type="file" name="file" accept=".pdf" onChange={handleFileChange} required />
              </div>
            </div>

            <br/>
            <div className="row">
              <button type="submit" value="Submit" className='fbmas-upload'>Upload Project</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
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

export default AttachedProject;

