import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import candidatesData from "../data/candidatesData";
import CandidateModal from "../components/CandidateModal";
import BackButton from "../components/BackButton";
import "./Candidates.css";

import { FaEye, FaEdit } from "react-icons/fa";

const Candidates = ({ darkMode, setDarkMode }) => {

  const navigate = useNavigate();

  const [candidates, setCandidates] = useState(candidatesData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const candidatesPerPage = 5;

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * candidatesPerPage;
  const indexOfFirst = indexOfLast - candidatesPerPage;

  const currentCandidates = filteredCandidates.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredCandidates.length / candidatesPerPage
  );

  const handleAdd = () => {
    setModalMode("add");
    setSelectedCandidate(null);
    setShowModal(true);
  };

  const handleEdit = (candidate) => {
    setModalMode("edit");
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleView = (candidate) => {
    setModalMode("view");
    setSelectedCandidate(candidate);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = (candidateData) => {
    if (modalMode === "add") {
      const newCandidate = {
        ...candidateData,
        id: candidates.length + 1,
      };
      setCandidates([...candidates, newCandidate]);
    } else if (modalMode === "edit") {
      const updated = candidates.map((c) =>
        c.id === selectedCandidate.id
          ? { ...c, ...candidateData }
          : c
      );
      setCandidates(updated);
    }

    setShowModal(false);
  };

  // LOGOUT FUNCTION FIX
  const handleLogout = () => {
    localStorage.removeItem("token"); // optional
    alert("Logged Out Successfully");
    navigate("/");
  };

  return (
    <div className={`candidates-page ${darkMode ? "dark-mode" : ""}`}>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 position-relative">

        <a className="navbar-brand fw-bold" href="/dashboard">
          ATS Dashboard
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-4 mt-3 mt-lg-0">
            <a href="/dashboard" className="btn btn-light btn-sm">Dashboard</a>
            <a href="/jobs" className="btn btn-light btn-sm">Jobs</a>
            <a href="/candidates" className="btn btn-light btn-sm">Candidates</a>
          </div>

          {/* CENTER TEXT */}
          <div className="position-absolute start-50 translate-middle-x text-white fw-semibold">
            Welcome Admin
          </div>

          {/* RIGHT SIDE */}
          <div className="ms-auto d-flex gap-2 mt-3 mt-lg-0">

            {/* Dark Mode */}
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            {/* Logout */}
            <button
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* MAIN */}
      <div className="container py-4">

        <BackButton />

        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h2 className="fw-bold">Candidate Listing</h2>

          <button className="btn btn-primary" onClick={handleAdd}>
            + Add Candidate
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="row g-3 mb-4">

          <div className="col-lg-8">
            <input
              type="text"
              className={`form-control ${darkMode ? "dark-input" : ""}`}
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-lg-4">
            <select
              className={`form-select ${darkMode ? "dark-input" : ""}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Selected">Selected</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        </div>

        {/* TABLE */}
        <div className="card border-0 shadow-sm">
          <div className="card-body table-responsive">

            <table className={`table table-hover align-middle ${darkMode ? "table-dark" : ""}`}>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {currentCandidates.length > 0 ? (
                  currentCandidates.map((candidate) => (
                    <tr key={candidate.id}>

                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.role}</td>
                      <td>{candidate.score}%</td>

                      <td>
                        <span
                          className={`badge ${
                            candidate.status === "Selected"
                              ? "bg-success"
                              : candidate.status === "Pending"
                                ? "bg-warning"
                                : "bg-danger"
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex gap-2 justify-content-center">

                          <button
                            className="btn btn-sm text-white"
                            style={{ backgroundColor: "#0d6efd" }}
                            onClick={() => handleView(candidate)}
                          >
                            <FaEye />
                          </button>

                          <button
                            className="btn btn-sm text-white"
                            style={{ backgroundColor: "#fd7e14" }}
                            onClick={() => handleEdit(candidate)}
                          >
                            <FaEdit />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No Candidates Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>

      {/* MODAL */}
      <CandidateModal
        show={showModal}
        handleClose={handleClose}
        mode={modalMode}
        selectedCandidate={selectedCandidate}
        handleSave={handleSave}
        darkMode={darkMode}
      />

    </div>
  );
};

export default Candidates;