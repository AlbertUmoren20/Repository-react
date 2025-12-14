// FbmasStudent.jsx
import React from "react";
import ProjectRepo from "../ProjectRepo/ProjectRepo";
import logo from "../Assets/Ellipse 2.png";

export default function FbmasStudent() {
  const departments = [
    "Computer Science",
    "Information science",
    "Biotech",
    "Microbiology",
    "Medical lab.",
    "BioChemistry",
  ];
  const years = [2022, 2023, 2024, 2025, 2026];

  return (
    <ProjectRepo
      title="FBMAS E-REPOSITORY"
      subtitle="Faculty of Basic Medical and Applied Sciences"
      fetchUrl="http://localhost:8080/student/getFbmasUpload"
      departments={departments}
      years={years}
      attachPath="/AttachProject"
      logo={logo}
    />
  );
}
