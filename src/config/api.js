// API Configuration
// This file centralizes all API endpoint URLs
// Use environment variables for different environments

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://studentrepository-backend.onrender.com';

const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/student/login`,
  REGISTER: `${API_BASE_URL}/student/add`,
  
  // Admin endpoints
  GET_FACULTIES: `${API_BASE_URL}/admin/getFaculties`,
  ADD_FACULTY: `${API_BASE_URL}/admin/addFaculty`,
  DELETE_FACULTY: `${API_BASE_URL}/admin/deleteFaculty`,
  GET_ALL_PROJECTS: `${API_BASE_URL}/admin/getAllProjects`,
  UPDATE_PROJECT: `${API_BASE_URL}/admin/updateProject`,
  DELETE_PROJECT: `${API_BASE_URL}/admin/deleteProject`,
  GET_PROJECT_STATS: `${API_BASE_URL}/admin/getProjectStats`,
  
  // Student endpoints
  UPLOAD_FBMAS: `${API_BASE_URL}/student/upload/FBMAS`,
  UPLOAD_FAMSS: `${API_BASE_URL}/student/upload/FAMSS`,
  UPLOAD_NURSING: `${API_BASE_URL}/student/upload/NURSING`,
  UPLOAD_GENERIC: (abbr) => `${API_BASE_URL}/student/upload/${abbr}`,
  UPLOAD_FBMAS_LEGACY: `${API_BASE_URL}/student/uploadFbmas`,
  UPLOAD_FAMSS_LEGACY: `${API_BASE_URL}/student/uploadFamss`,
  GET_FBMAS_UPLOAD: `${API_BASE_URL}/student/getFbmasUpload`,
  GET_FAMSS_UPLOAD: `${API_BASE_URL}/student/getFamssUpload`,
  GET_NURSING_UPLOAD: `${API_BASE_URL}/student/getNursingUpload`,
  GET_UPLOAD_BY_FACULTY: (abbr) => `${API_BASE_URL}/student/getUpload/${abbr}`,
  
  // Lecturer endpoints
  GET_CIRCULARS: `${API_BASE_URL}/lecturer/getCirculars`,
  UPLOAD_CIRCULAR: `${API_BASE_URL}/lecturer/uploadCircular`,
  GET_FILE: (id) => `${API_BASE_URL}/lecturer/getFile/${id}`,
};

// Helper function to get full URL for file paths
export const getFileUrl = (filePath) => {
  if (!filePath || filePath === "#" || filePath === "null" || filePath === "undefined") {
    return null;
  }
  
  // If it's already a full URL, return as is
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  
  // If it starts with a slash, it's an absolute path on the server
  if (filePath.startsWith("/")) {
    return `${API_BASE_URL}${filePath}`;
  }
  
  // Otherwise, treat as relative path and prepend backend URL
  const cleanPath = filePath.replace(/^\/+/, "");
  return `${API_BASE_URL}/${cleanPath}`;
};

export default API_ENDPOINTS;
export { API_BASE_URL };

