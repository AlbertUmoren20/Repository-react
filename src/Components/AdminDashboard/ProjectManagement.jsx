import React, { useState, useEffect } from "react";
import { FaSpinner, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFaculties } from "../../Contexts/FacultyContext";

const ProjectManagement = () => {
  const { getFacultyAbbreviations } = useFaculties();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL
   
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/getAllProjects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
      } else {
        // Mock data for development
        setProjects([
          {
            id: 1,
            title: "Sample Project 1",
            projectBy: "John Doe",
            department: "Computer Science",
            year: 2024,
            supervisor: "Dr. Smith",
            faculty: "FBMAS",
            description: "Sample project description",
          },
          {
            id: 2,
            title: "Sample Project 2",
            projectBy: "Jane Smith",
            department: "Economics",
            year: 2024,
            supervisor: "Dr. Johnson",
            faculty: "FAMSS",
            description: "Another sample project",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Mock data for development
      setProjects([
        {
          id: 1,
          title: "Sample Project 1",
          projectBy: "John Doe",
          department: "Computer Science",
          year: 2024,
          supervisor: "Dr. Smith",
          faculty: "FBMAS",
          description: "Sample project description",
        },
        {
          id: 2,
          title: "Sample Project 2",
          projectBy: "Jane Smith",
          department: "Economics",
          year: 2024,
          supervisor: "Dr. Johnson",
          faculty: "FAMSS",
          description: "Another sample project",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project.id);
    setEditFormData({ ...project });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/updateProject/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        toast.success("Project updated successfully!");
        setEditingProject(null);
        fetchProjects();
      } else {
        // Mock update for development
        setProjects(
          projects.map((p) => (p.id === id ? { ...p, ...editFormData } : p))
        );
        toast.success("Project updated successfully! (Mock)");
        setEditingProject(null);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      // Mock update for development
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, ...editFormData } : p))
      );
      toast.success("Project updated successfully! (Mock)");
      setEditingProject(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/deleteProject/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Project deleted successfully!");
        fetchProjects();
      } else {
        // Mock delete for development
        setProjects(projects.filter((p) => p.id !== id));
        toast.success("Project deleted successfully! (Mock)");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      // Mock delete for development
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted successfully! (Mock)");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !searchTerm ||
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectBy?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = !selectedFaculty || project.faculty === selectedFaculty;
    const matchesYear = !selectedYear || project.year === parseInt(selectedYear);

    return matchesSearch && matchesFaculty && matchesYear;
  });

  const faculties = getFacultyAbbreviations();
  const years = [2022, 2023, 2024, 2025, 2026];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Projects</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Faculties</option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <FaSpinner className="animate-spin mx-auto text-blue-500" size={24} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No projects found
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      {editingProject === project.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editFormData.title || ""}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, title: e.target.value })
                              }
                              className="w-full px-2 py-1 border rounded"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editFormData.projectBy || ""}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, projectBy: e.target.value })
                              }
                              className="w-full px-2 py-1 border rounded"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editFormData.department || ""}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, department: e.target.value })
                              }
                              className="w-full px-2 py-1 border rounded"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={editFormData.year || ""}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, year: parseInt(e.target.value) })
                              }
                              className="w-full px-2 py-1 border rounded"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={editFormData.faculty || ""}
                              onChange={(e) =>
                                setEditFormData({ ...editFormData, faculty: e.target.value })
                              }
                              className="w-full px-2 py-1 border rounded"
                            >
                              {faculties.map((faculty) => (
                                <option key={faculty} value={faculty}>
                                  {faculty}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate(project.id)}
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingProject(null)}
                                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {project.title}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {project.projectBy}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {project.department}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{project.year}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {project.faculty || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(project)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit project"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                title="Delete project"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;

