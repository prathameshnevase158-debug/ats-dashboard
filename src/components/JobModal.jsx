import React, { useEffect, useState } from "react";

const JobModal = ({
  show,
  handleClose,
  mode,
  selectedJob,
  handleSave,
}) => {
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    experience: "",
    salary: "",
    status: "Open",
    applyCount: "",
  });

  const [errors, setErrors] = useState({});

  // Load Selected Job
  useEffect(() => {
    if (selectedJob) {
      setJobData(selectedJob);
    } else {
      setJobData({
        title: "",
        department: "",
        experience: "",
        salary: "",
        status: "Open",
        applyCount: "",
      });
    }
  }, [selectedJob]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!jobData.title) {
      newErrors.title = "Job title is required";
    }

    if (!jobData.department) {
      newErrors.department = "Department is required";
    }

    if (!jobData.experience) {
      newErrors.experience = "Experience is required";
    }

    if (!jobData.salary) {
      newErrors.salary = "Salary is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Save
  const onSubmit = () => {
    if (mode !== "view") {
      if (validateForm()) {
        handleSave(jobData);
      }
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">

        <div className="modal-content border-0 rounded-4">

          {/* Header */}
          <div className="modal-header">

            <h5 className="modal-title">

              {mode === "add" && "Add New Job"}

              {mode === "edit" && "Edit Job"}

              {mode === "view" && "View Job Details"}

            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>

          </div>

          {/* Body */}
          <div className="modal-body">

            <div className="row g-3">

              {/* Job Title */}
              <div className="col-md-6">

                <label className="form-label">
                  Job Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

                {errors.title && (
                  <small className="text-danger">
                    {errors.title}
                  </small>
                )}

              </div>

              {/* Department */}
              <div className="col-md-6">

                <label className="form-label">
                  Department
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={jobData.department}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

                {errors.department && (
                  <small className="text-danger">
                    {errors.department}
                  </small>
                )}

              </div>

              {/* Experience */}
              <div className="col-md-6">

                <label className="form-label">
                  Experience
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={jobData.experience}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

                {errors.experience && (
                  <small className="text-danger">
                    {errors.experience}
                  </small>
                )}

              </div>

              {/* Salary */}
              <div className="col-md-6">

                <label className="form-label">
                  Salary
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

                {errors.salary && (
                  <small className="text-danger">
                    {errors.salary}
                  </small>
                )}

              </div>

              {/* Status */}
              <div className="col-md-6">

                <label className="form-label">
                  Job Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={jobData.status}
                  onChange={handleChange}
                  disabled={mode === "view"}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>

              </div>

              {/* Apply Count */}
              <div className="col-md-6">

                <label className="form-label">
                  Apply Count
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="applyCount"
                  value={jobData.applyCount}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>

            {mode !== "view" && (
              <button
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Save Job
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default JobModal;