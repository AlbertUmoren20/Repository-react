import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaTrash, FaSpinner } from "react-icons/fa";
import { useFaculties } from "../../Contexts/FacultyContext";
import API_ENDPOINTS from "../../config/api";

const FacultyManagement = () => {
  const { faculties, isLoading, fetchFaculties, addFaculty, removeFaculty } = useFaculties();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    abbreviation: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.ADD_FACULTY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const newFaculty = data || {
          id: faculties.length + 1,
          ...formData,
        };
        addFaculty(newFaculty);
        toast.success("Faculty added successfully!");
        setFormData({ name: "", abbreviation: "", description: "" });
        // Refresh the list to ensure consistency
        fetchFaculties();
      } else {
        const errorText = await response.text().catch(() => "Unknown error");
        toast.error(`Failed to add faculty: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
      toast.error(`Failed to add faculty: ${error.message || "Network error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.DELETE_FACULTY}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        removeFaculty(id);
        toast.success("Faculty deleted successfully!");
        fetchFaculties();
      } else {
        const errorText = await response.text().catch(() => "Unknown error");
        toast.error(`Failed to delete faculty: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      toast.error(`Failed to delete faculty: ${error.message || "Network error"}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Faculty</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Faculty Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Abbreviation
            </label>
            <input
              type="text"
              value={formData.abbreviation}
              onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaPlus />}
            <span>Add Faculty</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Existing Faculties</h2>
        </div>
        {isLoading ? (
          <div className="p-6 text-center">
            <FaSpinner className="animate-spin mx-auto text-blue-500" size={24} />
          </div>
        ) : (
          <div className="divide-y">
            {faculties.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No faculties found</div>
            ) : (
              faculties.map((faculty) => (
                <div key={faculty.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-gray-900">{faculty.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">{faculty.abbreviation}</span> - {faculty.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(faculty.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete faculty"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyManagement;

