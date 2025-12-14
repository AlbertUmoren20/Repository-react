import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaDownload, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/**
 * FileViewer Component
 * Displays files in a modal with support for:
 * - PDF files (embedded viewer)
 * - Image files (direct display)
 * - Other files (download option)
 */
const FileViewer = ({ fileUrl, fileName, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileType, setFileType] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const loadTimeoutRef = useRef(null);

  useEffect(() => {
    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    if (fileUrl) {
      // Determine file type from URL or fileName
      const url = fileUrl.toLowerCase();
      const name = (fileName || "").toLowerCase();
      
      if (url.includes(".pdf") || name.includes(".pdf")) {
        setFileType("pdf");
        setPageNumber(1);
        setNumPages(null);
      } else if (
        url.includes(".jpg") || url.includes(".jpeg") || 
        url.includes(".png") || url.includes(".gif") || 
        url.includes(".webp") || url.includes(".svg") ||
        name.includes(".jpg") || name.includes(".jpeg") || 
        name.includes(".png") || name.includes(".gif") || 
        name.includes(".webp") || name.includes(".svg")
      ) {
        setFileType("image");
      } else if (
        url.includes(".doc") || url.includes(".docx") ||
        name.includes(".doc") || name.includes(".docx")
      ) {
        setFileType("document");
      } else {
        setFileType("other");
      }

      // Check if file URL is valid
      if (!fileUrl || fileUrl === "#" || fileUrl === "null" || fileUrl === "undefined") {
        setError("No file URL provided. The project may not have a file attached.");
        setLoading(false);
      } else {
        setLoading(true);
        setError("");
        
        // Set a timeout for PDF loading (30 seconds)
        if (url.includes(".pdf") || name.includes(".pdf")) {
          loadTimeoutRef.current = setTimeout(() => {
            setError("PDF took too long to load. The file may be corrupted, the server may be slow, or there may be a network issue. Please try downloading the file instead.");
            setLoading(false);
            loadTimeoutRef.current = null;
          }, 30000);
        }
      }
    }

    // Cleanup timeout on unmount or when fileUrl/fileName changes
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [fileUrl, fileName]);

  // Construct full URL if it's a relative path
  const getFullUrl = () => {
    if (!fileUrl || fileUrl === "#" || fileUrl === "null" || fileUrl === "undefined") {
      return null;
    }
    
    // If it's already a full URL, return as is
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      return fileUrl;
    }
    
    // If it starts with a slash, it's an absolute path on the server
    if (fileUrl.startsWith("/")) {
      return `http://localhost:8080${fileUrl}`;
    }
    
    // Otherwise, treat as relative path and prepend backend URL
    // Remove any leading slashes to avoid double slashes
    const cleanPath = fileUrl.replace(/^\/+/, "");
    return `http://localhost:8080/${cleanPath}`;
  };

  const fullUrl = getFullUrl();

  const handleDownload = () => {
    if (fullUrl) {
      window.open(fullUrl, "_blank");
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError("");
  };

  const handleImageError = () => {
    setLoading(false);
    setError("Failed to load file. The file may not exist or may be corrupted.");
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    setNumPages(numPages);
    setLoading(false);
    setError("");
  };

  const onDocumentLoadError = (error) => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    setLoading(false);
    setError("Failed to load PDF. The file may not exist, may be corrupted, or there may be a server error. Please try downloading the file instead.");
    console.error("PDF load error:", error);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full h-full max-h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 truncate flex-1 mr-4">
            {fileName || "File Viewer"}
          </h2>
          <div className="flex items-center gap-2">
            {fullUrl && (
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition"
                title="Download file"
                aria-label="Download file"
              >
                <FaDownload />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition"
              aria-label="Close viewer"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 relative">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading File</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              {fullUrl && (
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition flex items-center gap-2"
                >
                  <FaDownload />
                  Try Downloading Instead
                </button>
              )}
            </div>
          ) : fileType === "pdf" ? (
            <div className="w-full h-full flex flex-col items-center">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-sky-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading PDF...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
                  </div>
                </div>
              )}
              {fullUrl && (
                <div className="w-full flex flex-col items-center">
                  <Document
                    file={fullUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="flex items-center justify-center py-8">
                        <FaSpinner className="animate-spin text-4xl text-sky-500 mx-auto mb-4" />
                        <p className="text-gray-600">Loading PDF...</p>
                      </div>
                    }
                    error={
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
                        <p className="text-gray-600">Failed to load PDF</p>
                      </div>
                    }
                  >
                    <div className="flex justify-center mb-4 overflow-auto">
                      <Page
                        pageNumber={pageNumber}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-lg"
                        width={Math.min(window.innerWidth * 0.8, 800)}
                      />
                    </div>
                  </Document>
                  {numPages && numPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-4 pb-4">
                      <button
                        onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                        disabled={pageNumber <= 1}
                        className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-gray-700">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
                        disabled={pageNumber >= numPages}
                        className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : fileType === "image" ? (
            <div className="flex items-center justify-center h-full">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-4xl text-sky-500" />
                </div>
              )}
              <img
                src={fullUrl}
                alt={fileName || "File preview"}
                className="max-w-full max-h-full object-contain"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          ) : fileType === "document" || fileType === "other" ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 text-gray-400 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {fileType === "document" ? "Document File" : "File Preview Not Available"}
              </h3>
              <p className="text-gray-600 mb-6">
                {fileType === "document"
                  ? "This document cannot be previewed in the browser. Please download it to view."
                  : "This file type cannot be previewed. Please download it to view."}
              </p>
              {fullUrl && (
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-sky-600 text-white rounded hover:bg-sky-700 transition flex items-center gap-2 mx-auto"
                >
                  <FaDownload />
                  Download File
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FaSpinner className="animate-spin text-4xl text-sky-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading file...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer;

