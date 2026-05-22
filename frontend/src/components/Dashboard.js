import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ refresh }) {
  const [summary, setSummary] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    submitted: 0,
    highCost: 0,
    approvalRate: 0
  });

  useEffect(() => {
    fetchSummary();
  }, [refresh]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/requests");
      const requests = response.data;

      const total = requests.length;
      const approved = requests.filter((r) => r.status === "Approved").length;
      const rejected = requests.filter((r) => r.status === "Rejected").length;
      const submitted = requests.filter((r) => r.status === "Submitted").length;
      const highCost = requests.filter((r) => r.costCategory === "High").length;

      const approvalRate =
        total > 0 ? Math.round((approved / total) * 100) : 0;

      setSummary({
        total,
        approved,
        rejected,
        submitted,
        highCost,
        approvalRate
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    borderRadius: "18px",
    border: "none"
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-1">Admin Dashboard</h2>
      <p className="text-muted mb-4">
        Cloud resource governance and cost overview
      </p>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow p-4 text-center" style={cardStyle}>
            <h6 className="text-muted">Total Requests</h6>
            <h1 className="fw-bold">{summary.total}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center" style={cardStyle}>
            <h6 className="text-muted">Approved</h6>
            <h1 className="fw-bold text-success">{summary.approved}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center" style={cardStyle}>
            <h6 className="text-muted">Rejected</h6>
            <h1 className="fw-bold text-danger">{summary.rejected}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center" style={cardStyle}>
            <h6 className="text-muted">Submitted</h6>
            <h1 className="fw-bold text-secondary">{summary.submitted}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center" style={cardStyle}>
            <h6 className="text-muted">High Cost Requests</h6>
            <h1 className="fw-bold text-warning">{summary.highCost}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4 text-center" style={cardStyle}>
            <h6 className="text-muted">Approval Rate</h6>
            <h1 className="fw-bold text-primary">{summary.approvalRate}%</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;