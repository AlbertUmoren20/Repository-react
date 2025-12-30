// ProjectRepo.jsx
import React, { useEffect, useState, useCallback } from "react";
import { FaSearch, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import FileViewer from "../FileViewer/FileViewer";

/**
 * Props:
 * - title (string) : header title (e.g. "FAMSS E-REPOSITORY")
 * - subtitle (string) : subheading
 * - fetchUrl (string) : API endpoint to fetch projects
 * - departments (string[]) : dropdown options (display values)
 * - years (number[]) : dropdown options
 * - attachPath (string) : path to navigate when user clicks upload
 * - logo (string) : image import path
 */
export default function ProjectRepo({
  title,
  subtitle,
  fetchUrl,
  departments = [],
  years = [],
  attachPath = "/AttachProject",
  logo,
}) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [fileViewerOpen, setFileViewerOpen] = useState(false);
  
  const location = useLocation();
  // Get user level from URL params or localStorage as fallback
  const userLevel = new URLSearchParams(location?.search).get("userLevel") || localStorage.getItem("userLevel") || "";
  // Fetch projects
  const fetchProjects = useCallback(async (signal) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(fetchUrl, { signal });
      if (!res.ok) throw new Error(res.statusText || "Failed to fetch");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message || "Failed to load");
    } finally {
      setIsLoading(false);
    }
  }, [fetchUrl]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchProjects(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchProjects]);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // filter logic
  useEffect(() => {
    const yearNum = selectedYear ? parseInt(selectedYear, 10) : null;
    const dept = selectedDepartment ? selectedDepartment.toLowerCase() : null;
    const q = debouncedSearch || "";

    const out = projects.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const department = (p.department || "").toLowerCase();
      const year = typeof p.year === "string" ? parseInt(p.year, 10) : p.year;

      return (
        title.includes(q) &&
        (!yearNum || year === yearNum) &&
        (!dept || department === dept)
      );
    });

    setFiltered(out);
  }, [projects, debouncedSearch, selectedYear, selectedDepartment]);

  // modal keyboard (escape)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    // prevent body scroll
    document.body.style.overflow = "hidden";
  };
  const onCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-slate-50 to-white">
      <BackButton />
      {/* Header */}
      <header className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
        <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-md object-cover" />
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          {userLevel === "400" && (
            <button
              onClick={() => navigate(attachPath)}
              className="px-4 py-2 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700 transition"
            >
              Upload Project
            </button>
          )}
          <button
            onClick={() => {
              const ctrl = new AbortController();
              fetchProjects(ctrl.signal);
            }}
            className="px-4 py-2 bg-white border rounded-md shadow hover:shadow-md transition"
            aria-label="Refresh projects"
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Controls */}
      <section className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <label className="relative col-span-1 md:col-span-2">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title..."
            className="pl-10 pr-3 py-3 w-full rounded-lg border focus:ring focus:ring-sky-200"
            aria-label="Search projects"
          />
        </label>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="py-3 px-3 rounded-lg border"
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d.toLowerCase()}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="py-3 px-3 rounded-lg border"
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto mt-8">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin w-8 h-8 text-sky-500" aria-hidden />
            <span className="sr-only">Loading</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500" />
            <div>
              <p className="text-sm font-medium">No Live Projects</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => {
                  const ctrl = new AbortController();
                  fetchProjects(ctrl.signal);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <h3 className="text-xl font-bold">Nothing found</h3>
            <p className="mt-2">Try a different search term or filter.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => {
            const id = p.id ?? p._id ?? `${p.title}-${Math.random().toString(36).slice(2, 9)}`;
            return (
              <article
                key={id}
                onClick={() => onOpenModal(p)}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? onOpenModal(p) : undefined)}
              >
                <h3 className="text-xl font-bold line-clamp-2">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{p.projectBy}</p>

                <div className="mt-3 text-xs text-gray-400 flex justify-between">
                  <span>{p.department}</span>
                  <span>Year: {p.year}</span>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-3">{p.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black/40" onClick={onCloseModal} />
          <div className="relative max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 z-10">
            <button
              onClick={onCloseModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close details"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              By <strong>{selectedProject.projectBy}</strong> — {selectedProject.department} • Year: {selectedProject.year}
            </p>
            <div className="prose max-w-none text-sm text-gray-700">
              <h3 className="text-sm font-medium">Supervisor</h3>
              <p className="text-sm">{selectedProject.supervisor || "N/A"}</p>

              <h3 className="text-sm font-medium mt-4">Abstract</h3>
              <p>{selectedProject.description || "No abstract provided."}</p>
            </div>

            <div className="mt-6 flex gap-3">
              {userLevel === "400" ? (
                <button
                  onClick={() => {
                    setFileViewerOpen(true);
                  }}
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                >
                  View File
                </button>
              ) : (
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setPermissionModalOpen(true);
                  }}
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                >
                  View File
                </button>
              )}
              <button
                onClick={onCloseModal}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      {permissionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black/40" onClick={() => setPermissionModalOpen(false)} />
          <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg p-6 z-10">
            <button
              onClick={() => setPermissionModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close permission modal"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Permission Required</h3>
              <p className="text-sm text-gray-500 mb-6">
                You need permission from the librarian to view this file. Please contact the librarian for access.
              </p>
              <button
                onClick={() => setPermissionModalOpen(false)}
                className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Viewer */}
      {fileViewerOpen && selectedProject && (
        <FileViewer
          fileUrl={selectedProject.fileUrl || selectedProject.file || selectedProject.filePath || selectedProject.url}
          fileName={selectedProject.title || selectedProject.fileName || "Project File"}
          onClose={() => setFileViewerOpen(false)}
        />
      )}
    </main>
  );
}
