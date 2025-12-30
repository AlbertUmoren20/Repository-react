// FamssStudent.jsx
import React from "react";
import ProjectRepo from "../ProjectRepo/ProjectRepo";
import logo from "../Assets/Ellipse 2.png";
import API_ENDPOINTS from "../../config/api";
export default function FamssStudent() {
  const departments = [
    "Mass Communication",
    "Economics",
    "Business Admin",
    "Accounting",
    "Inter rel.",
    "Political Science",
  ];
  const years = [2022, 2023, 2024, 2025, 2026];

  return (
    <ProjectRepo
      title="FAMSS E-REPOSITORY"
      subtitle="Faculty of Art Management and Social Sciences"
      fetchUrl={API_ENDPOINTS.GET_FAMSS_UPLOAD}
      departments={departments}
      years={years}
      attachPath="/AttachProjectFamss"
      logo={logo}
    />
  );
}
