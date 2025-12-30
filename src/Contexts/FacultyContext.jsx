import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API_ENDPOINTS from "../config/api";

const FacultyContext = createContext();

export const useFaculties = () => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error("useFaculties must be used within a FacultyProvider");
  }
  return context;
};

export const FacultyProvider = ({ children }) => {
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchFaculties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.GET_FACULTIES);
      if (response.ok) {
        const data = await response.json();
        setFaculties(Array.isArray(data) ? data : []);
      } else {
        // Fallback to default faculties if API fails
        setFaculties([
          { id: 1, name: "Faculty of Basic Medical and Applied Sciences", abbreviation: "FBMAS", description: "Basic medical and applied sciences" },
          { id: 2, name: "Faculty of Art Management and Social Sciences", abbreviation: "FAMSS", description: "Art management and social sciences" },
          { id: 3, name: "Faculty of Nursing", abbreviation: "NURSING", description: "Nursing studies" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
      setError(error.message);
      // Fallback to default faculties on error
      setFaculties([
        { id: 1, name: "Faculty of Basic Medical and Applied Sciences", abbreviation: "FBMAS", description: "Basic medical and applied sciences" },
        { id: 2, name: "Faculty of Art Management and Social Sciences", abbreviation: "FAMSS", description: "Art management and social sciences" },
        { id: 3, name: "Faculty of Nursing", abbreviation: "NURSING", description: "Nursing studies" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addFaculty = useCallback((newFaculty) => {
    setFaculties((prev) => [...prev, newFaculty]);
  }, []);

  const removeFaculty = useCallback((id) => {
    setFaculties((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const getFacultyAbbreviations = useCallback(() => {
    return faculties.map((f) => f.abbreviation).filter(Boolean);
  }, [faculties]);

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);

  const value = {
    faculties,
    isLoading,
    error,
    fetchFaculties,
    addFaculty,
    removeFaculty,
    getFacultyAbbreviations,
  };

  return <FacultyContext.Provider value={value}>{children}</FacultyContext.Provider>;
};

