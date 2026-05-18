import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import dashboardData from "../data/dashboardData";
import BackButton from "../components/BackButton";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const Dashboard = ({ darkMode, setDarkMode }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Logged Out Successfully");
        navigate("/");
    };

    /* Chart Data */
    const chartData = [
        { month: "Jan", applications: 35 },
        { month: "Feb", applications: 50 },
        { month: "Mar", applications: 75 },
        { month: "Apr", applications: 60 },
        { month: "May", applications: 95 },
        { month: "Jun", applications: 80 },
    ];

    return (
        <div className={darkMode ? "dashboard-container dark-mode" : "dashboard-container"}>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">

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

                    <div className="ms-auto d-flex gap-2 mt-3 mt-lg-0">

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? "☀ Light" : "🌙 Dark"}
                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>

            {/* Main */}
            <div className="container-fluid py-4">

                <BackButton />

                <h2 className="fw-bold mb-4">Dashboard</h2>

                {/* Summary Cards */}
                <div className="row g-4">

                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="card summary-card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6>Total Jobs</h6>
                                        <h2>{dashboardData.totalJobs}</h2>
                                    </div>
                                    <i className="bi bi-briefcase-fill card-icon text-primary"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="card summary-card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6>Total Candidates</h6>
                                        <h2>{dashboardData.totalCandidates}</h2>
                                    </div>
                                    <i className="bi bi-people-fill card-icon text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="card summary-card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6>Interview Scheduled</h6>
                                        <h2>{dashboardData.interviews}</h2>
                                    </div>
                                    <i className="bi bi-calendar-check-fill card-icon text-warning"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="card summary-card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6>Selected Candidates</h6>
                                        <h2>{dashboardData.selectedCandidates}</h2>
                                    </div>
                                    <i className="bi bi-person-check-fill card-icon text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Chart Section */}

                <div className="row mt-4">

                    <div className="col-12">

                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                            <div
                                className={`card-header border-0 py-3 ${darkMode ? "bg-dark text-white" : "bg-white"
                                    }`}
                            >
                                <div className="d-flex justify-content-between align-items-center">

                                    <div>
                                        <h4 className="fw-bold mb-1">
                                            Applications Overview
                                        </h4>

                                        <small className="text-muted">
                                            Monthly Job Applications Analytics
                                        </small>
                                    </div>

                                    <div className="bg-primary text-white px-3 py-2 rounded-pill fw-semibold">
                                        2025
                                    </div>

                                </div>
                            </div>

                            <div className="card-body p-4">

                                <ResponsiveContainer width="100%" height={350}>

                                    <BarChart
                                        data={chartData}
                                        barCategoryGap="25%"
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="month"
                                            tick={{ fontSize: 14 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <YAxis
                                            tick={{ fontSize: 14 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />

                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "12px",
                                                border: "none",
                                                boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
                                            }}
                                        />

                                        <Bar
                                            dataKey="applications"
                                            fill="#0d6efd"
                                            radius={[12, 12, 0, 0]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Tables Section */}
                <div className="row mt-4">

                    {/* Recent Applications */}
                    <div className="col-lg-8 mb-4">

                        <div className="card border-0 shadow-sm">

                            <div className={`card-header ${darkMode ? "dark-card-header" : "bg-white"}`}>
                                <h5 className="mb-0">Recent Applications</h5>
                            </div>

                            <div className="card-body table-responsive">

                                <table className={`table table-hover align-middle ${darkMode ? "table-dark" : ""}`}>

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Score</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {dashboardData.recentApplications.map((candidate) => (

                                            <tr key={candidate.id}>

                                                <td>{candidate.name}</td>

                                                <td>{candidate.position}</td>

                                                <td>{candidate.score}%</td>

                                                <td>

                                                    <span
                                                        className={`badge ${candidate.status === "Selected"
                                                                ? "bg-success"
                                                                : candidate.status === "Pending"
                                                                    ? "bg-warning"
                                                                    : "bg-danger"
                                                            }`}
                                                    >
                                                        {candidate.status}
                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                    {/* Upcoming Interviews */}
                    <div className="col-lg-4 mb-4">

                        <div className="card border-0 shadow-sm">

                            <div className={`card-header ${darkMode ? "dark-card-header" : "bg-white"}`}>
                                <h5 className="mb-0">Upcoming Interviews</h5>
                            </div>

                            <div className="card-body">

                                {dashboardData.upcomingInterviews.map((interview) => (

                                    <div
                                        key={interview.id}
                                        className={`interview-box mb-3 ${darkMode ? "dark-interview-box" : ""}`}
                                    >

                                        <h6>{interview.name}</h6>

                                        <p className="mb-1">
                                            Position: {interview.position}
                                        </p>

                                        <small className="text-muted">
                                            {interview.date}
                                        </small>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;