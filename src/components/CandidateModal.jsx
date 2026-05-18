import React, {
  useEffect,
  useState,
} from "react";

const CandidateModal = ({
  show,
  handleClose,
  mode,
  selectedCandidate,
  handleSave,
  darkMode,
}) => {
  const [candidateData, setCandidateData] =
    useState({
      name: "",
      email: "",
      role: "",
      score: "",
      status: "Pending",
    });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCandidate) {
      setCandidateData(selectedCandidate);
    }
  }, [selectedCandidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCandidateData({
      ...candidateData,
      [name]: value,
    });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!candidateData.name) {
      newErrors.name = "Name required";
    }

    if (!candidateData.email) {
      newErrors.email = "Email required";
    }

    if (!candidateData.role) {
      newErrors.role = "Role required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)
      .length === 0;
  };

  const onSubmit = () => {
    if (mode !== "view") {
      if (validate()) {
        handleSave(candidateData);
      }
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor:
          "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">

        <div className="modal-content border-0 rounded-4">

          {/*  Header */}
          <div className="modal-header">

            <h5 className="modal-title">

              {mode === "add" &&
                "Add Candidate"}

              {mode === "edit" &&
                "Edit Candidate"}

              {mode === "view" &&
                "View Candidate"}

            </h5>

            <button
              className="btn-close"
              onClick={handleClose}
            ></button>

          </div>
          

          /* Body */
          <div className="modal-body">

            <div className="row g-3">

              {/* Name */}
              <div className="col-md-6">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={candidateData.name}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

                {errors.name && (
                  <small className="text-danger">
                    {errors.name}
                  </small>
                )}

              </div>

              {/* Email */}
              <div className="col-md-6">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={candidateData.email}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

                {errors.email && (
                  <small className="text-danger">
                    {errors.email}
                  </small>
                )}

              </div>

              {/* Role */}
              <div className="col-md-6">

                <label className="form-label">
                  Applied Role
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="role"
                  value={candidateData.role}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

              </div>

              {/* Score */}
              <div className="col-md-6">

                <label className="form-label">
                  Score
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="score"
                  value={candidateData.score}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />

              </div>

              {/* Status */}
              <div className="col-md-6">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={candidateData.status}
                  onChange={handleChange}
                  disabled={mode === "view"}
                >
                  <option value="Selected">
                    Selected
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

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
                Save Candidate
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default CandidateModal;