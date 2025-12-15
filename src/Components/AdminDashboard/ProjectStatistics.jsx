import React, { useState, useEffect } from "react";
import { FaSpinner, FaChartBar } from "react-icons/fa";
import { useFaculties } from "../../Contexts/FacultyContext";
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL

const ProjectStatistics = () => {
  const { getFacultyAbbreviations } = useFaculties();
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");


  useEffect(() => {
    fetchStatistics();
  }, [selectedYear, selectedFaculty]);

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/admin/getProjectStats`;
      const params = new URLSearchParams();
      if (selectedYear) params.append("year", selectedYear);
      if (selectedFaculty) params.append("faculty", selectedFaculty);
      if (params.toString()) url += "?" + params.toString();

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStats(Array.isArray(data) ? data : []);
      } else {
        // Mock data for development
        setStats([
          { faculty: "FBMAS", year: 2024, count: 45 },
          { faculty: "FAMSS", year: 2024, count: 32 },
          { faculty: "NURSING", year: 2024, count: 18 },
          { faculty: "FBMAS", year: 2023, count: 38 },
          { faculty: "FAMSS", year: 2023, count: 28 },
          { faculty: "NURSING", year: 2023, count: 15 },
        ]);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      // Mock data for development
      setStats([
        { faculty: "FBMAS", year: 2024, count: 45 },
        { faculty: "FAMSS", year: 2024, count: 32 },
        { faculty: "NURSING", year: 2024, count: 18 },
        { faculty: "FBMAS", year: 2023, count: 38 },
        { faculty: "FAMSS", year: 2023, count: 28 },
        { faculty: "NURSING", year: 2023, count: 15 },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const years = [2022, 2023, 2024, 2025, 2026];
  const faculties = getFacultyAbbreviations();

  // Group stats by faculty and year
  const groupedStats = stats.reduce((acc, stat) => {
    const key = `${stat.faculty}-${stat.year}`;
    if (!acc[key]) {
      acc[key] = { faculty: stat.faculty, year: stat.year, count: 0 };
    }
    acc[key].count += stat.count;
    return acc;
  }, {});

  const statsArray = Object.values(groupedStats);

  // Calculate totals
  const totalByFaculty = statsArray.reduce((acc, stat) => {
    acc[stat.faculty] = (acc[stat.faculty] || 0) + stat.count;
    return acc;
  }, {});

  const totalByYear = statsArray.reduce((acc, stat) => {
    acc[stat.year] = (acc[stat.year] || 0) + stat.count;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Project Statistics by Faculty and Year</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Faculty
            </label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Faculties</option>
              {faculties.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <FaSpinner className="animate-spin mx-auto text-blue-500" size={24} />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {faculties.map((faculty) => (
                <div key={faculty} className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaChartBar className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{faculty}</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalByFaculty[faculty] || 0}
                  </p>
                  <p className="text-sm text-gray-600">Total Projects</p>
                </div>
              ))}
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statsArray.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                        No statistics available
                      </td>
                    </tr>
                  ) : (
                    statsArray.map((stat, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {stat.faculty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stat.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stat.count}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectStatistics;

