import React, { useState } from "react";

import jobsData from "../data/jobsData";

import JobModal from "../components/JobModal";

import BackButton from "../components/BackButton";

import "./Jobs.css";

const Jobs = ({ darkMode, setDarkMode }) => {

  // States
  const [jobs, setJobs] = useState(jobsData);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [modalMode, setModalMode] =
    useState("add");

  const [selectedJob, setSelectedJob] =
    useState(null);

  // Add Job
  const handleAdd = () => {
    setModalMode("add");
    setSelectedJob(null);
    setShowModal(true);
  };

  // Edit Job
  const handleEdit = (job) => {
    setModalMode("edit");
    setSelectedJob(job);
    setShowModal(true);
  };

  // View Job
  const handleView = (job) => {
    setModalMode("view");
    setSelectedJob(job);
    setShowModal(true);
  };

  // Close Modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Save Job
  const handleSave = (jobData) => {

    // Add New Job
    if (modalMode === "add") {

      const newJob = {
        ...jobData,
        id: jobs.length + 1,
      };

      setJobs([...jobs, newJob]);
    }

    // Edit Existing Job
    else if (modalMode === "edit") {

      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id
          ? { ...selectedJob, ...jobData }
          : job
      );

      setJobs(updatedJobs);
    }

    setShowModal(false);
  };

  // Search + Filter
  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={darkMode ? "jobs-page dark-mode" : "jobs-page"}>

      {/* Navbar */}
    {/* Navbar */}
<nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">

  {/* Logo */}
  <a
    className="navbar-brand fw-bold"
    href="/dashboard"
  >
    ATS Dashboard
  </a>

  {/* Mobile Toggle */}
  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarContent"
  >
    <span className="navbar-toggler-icon"></span>
  </button>

  {/* Navbar Content */}
  <div
    className="collapse navbar-collapse position-relative"
    id="navbarContent"
  >

    {/* Left Navigation */}
    <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-4 mt-3 mt-lg-0">

      <a
        href="/dashboard"
        className="btn btn-light btn-sm"
      >
        Dashboard
      </a>

      <a
        href="/jobs"
        className="btn btn-light btn-sm"
      >
        Jobs
      </a>

      <a
        href="/candidates"
        className="btn btn-light btn-sm"
      >
        Candidates
      </a>

    </div>

    {/* Center Text */}
    <div className="position-absolute start-50 translate-middle-x text-white fw-semibold mt-3 mt-lg-0">
      Welcome Admin
    </div>

    {/* Right Buttons */}
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
        onClick={() => {
          alert("Logged Out Successfully");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>

  </div>

</nav>

      {/* Main Container */}
      <div className="container py-4">

        {/* Back Button */}
        <BackButton />

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

          <h2 className="fw-bold">
            Job Listings
          </h2>

          {/* Add Button */}
          <button
            className="btn btn-primary"
            onClick={handleAdd}
          >
            + Add New Job
          </button>

        </div>

        {/* Search + Filter */}
        <div className="row mb-4 g-3">

          {/* Search */}
          <div className="col-lg-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Filter */}
          <div className="col-lg-4">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Open">
                Open
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>

        </div>

        {/* Job Cards */}
        <div className="row g-4">

          {filteredJobs.length > 0 ? (

            filteredJobs.map((job) => (

              <div
                className="col-lg-4 col-md-6 col-12"
                key={job.id}
              >

                <div className="card job-card border-0 shadow-sm h-100">

                  <div className="card-body">

                    {/* Title + Status */}
                    <div className="d-flex justify-content-between align-items-start mb-2">

                      <h5 className="fw-bold">
                        {job.title}
                      </h5>

                      <span
                        className={`badge ${
                          job.status === "Open"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {job.status}
                      </span>

                    </div>

                    {/* Department */}
                    <p className="text-muted mb-2">
                      {job.department}
                    </p>

                    {/* Experience */}
                    <p className="mb-2">
                      <strong>Experience:</strong>{" "}
                      {job.experience}
                    </p>

                    {/* Salary */}
                    <p className="mb-2">
                      <strong>Salary:</strong>{" "}
                      {job.salary}
                    </p>

                    {/* Applicants */}
                    <p className="mb-3">
                      <strong>Applicants:</strong>{" "}
                      {job.applyCount}
                    </p>

                    {/* Buttons */}
                    <div className="d-flex gap-2">

                      {/* View */}
                      <button
                        className="btn btn-primary w-50"
                        onClick={() =>
                          handleView(job)
                        }
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        className="btn btn-outline-secondary w-50"
                        onClick={() =>
                          handleEdit(job)
                        }
                      >
                        Edit
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center py-5">

              <h5 className="text-muted">
                No Jobs Found
              </h5>

            </div>

          )}

        </div>

      </div>

      {/* Job Modal */}
      <JobModal
        show={showModal}
        handleClose={handleClose}
        mode={modalMode}
        selectedJob={selectedJob}
        handleSave={handleSave}
      />

    </div>
  );
};

export default Jobs;