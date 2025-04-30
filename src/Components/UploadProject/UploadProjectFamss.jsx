import React, { useState, useEffect } from 'react';
import logo from "../Assets/Ellipse 2.png";
import 'boxicons/css/boxicons.min.css';
import { nanoid } from 'nanoid';
import { FaThumbsDown } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

const UploadProjectFamss = () => {
  const [searchField, setSearchField] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showDescript, setShowDescript] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchProjects();
  }, []); // Empty array means it will run only once on mount

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/student/getFamssUpload');
      if (!response.ok) {
        throw new Error(`Error fetching projects: ${response.statusText}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = (projects, searchQuery, year, department) => {
    const parsedYear = year ? parseInt(year, 10) : null
    return projects.filter(project => {
      return project.title.toLowerCase().includes(searchQuery) &&
        (!parsedYear || project.year === parsedYear) &&
        (!department || project.department.toLowerCase() === department.toLowerCase());
    }
   );
  }

  const uploadClick = (event) => {
    setClicked(true);
    navigate("/AttachProjectFamss");
  }

  const onRemovedesc = () => {
    setShowDescript(false);
    setSelectedProject(null);
  }

  const onProjectClicked = (project) => {
    setSelectedProject(project);
    setShowDescript(true);
  }

  const filteredProjects = filterProjects(projects, searchField, selectedYear, selectedDepartment);

  const onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    setSearchField(searchField);
  }

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  }

  const onDepartmentChange = (event) => {
    const selectedDepartment = event.target.value.toLowerCase();
    setSelectedDepartment(selectedDepartment);
  }

  const years = [2022, 2023, 2024, 2025, 2026];
  const departments = ["Mass Communication", "Economics", "Business Admin", "Accounting"];

  return (
    <div className='faculty-wrapper'>
      <div className='faculty-wrapper-continer' style={{ display: showDescript ? "flex" : "none" }} onClick={onRemovedesc}>
        {selectedProject ? (
          <div className='faculty-wrapper-details' onClick={onRemovedesc}>
          <p>Title: {selectedProject.title}</p>
          <p>By: {selectedProject.projectBy}</p>
          <p>Department: {selectedProject.department}</p>
          <p>Year: {selectedProject.year}</p>
          <p>Supervisor: {selectedProject.supervisor}</p>

          <div className='abstract-div'>
           <div style={{
            textAlign: 'center',
            marginTop: '10px',
           }}>Abstract:</div>
          <p style={{alignItems:"center", padding:"10px"}}>
          {selectedProject.description}</p>
          </div>

        </div>
        ) : null}
      </div>
      <div className="HomeHeader-1">
        <span style={{ fontSize: "60px", textDecoration: "underline #83D0FC 10px" }}>FAMSS<br />E-REPOSITORY<br /></span>
        <h5>Faculty of Art Management and Social Sciences</h5>
      </div>
      <div className="HomeLogoFaculty">
        <img src={logo} 
          alt=""/>
      </div>
      <div className='uploadBtn-Famss' onClick={uploadClick}>
      <i class='bx bx-upload'></i>      </div>

      <div className='search-box-container'>
        <input
          className="search-box"
          type='search'
          placeholder="Search Projects"
          onChange={onSearchChange}
        />
        <select
          className='department-box-container'
          onChange={onDepartmentChange}
        >
          <option value="">Departments</option>
          {departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        <select
          className='year-box'
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {filteredProjects.length === 0 && <p style={{
        fontSize:"40px",
        textAlign:"center"
      }}>Nothing found!!</p>}
      <div className="filtered-projects">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card-1" onClick={() => onProjectClicked(project)}>
            <h2>{project.title.slice(0,20)}.... </h2>
            <h3> {project.projectBy}</h3>
            <p> {project.department}</p>
            <p> {project.supervisor}</p>
            <p style={{ fontSize: "14px" }}> Year: {project.year}</p>
            <p style={{ fontSize: "12px" }}> {project.description.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadProjectFamss;