import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users";
import "./Login.css";

const Login = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  // input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // validation
  const validate = () => {
    const err = {};

    if (!formData.email) err.email = "Email required";
    if (!formData.password) err.password = "Password required";

    return err;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert("Please fill all required fields");
      return;
    }

    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    );

    if (user) {
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container-fluid login-container">

      <div className="row min-vh-100 g-0">

        {/* LEFT SIDE */}
        <div className="col-lg-6 d-none d-lg-flex banner-section px-0">
          <div className="banner-content text-white">
            <h1>ATS Dashboard</h1>
            <p>Manage jobs, candidates and interviews easily.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center px-0">

          <div className="login-card shadow">

            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              {/* BUTTON */}
              <button className="btn btn-primary w-100">
                Login
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;