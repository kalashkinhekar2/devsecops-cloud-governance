import React, { useState } from "react";
import axios from "axios";

function RequestForm({ refreshRequests }) {

  const [formData, setFormData] = useState({
    requesterName: "",
    department: "",
    cloudProvider: "",
    resourceType: "",
    environment: "",
    purpose: "",
    durationDays: "",
    usageEstimate: "",
    accessJustification: "",
    owner: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const requestData = {
      ...formData,
      requesterEmail: localStorage.getItem("email")
    };
    await axios.post(
      "http://localhost:8000/api/requests",
      requestData
    );


      alert("Request Submitted Successfully");
      refreshRequests();

    } catch (error) {

      alert("Error submitting request");
    }
  };

  return (

    <div className="container mt-4">

      <h2>Create Cloud Resource Request</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="requesterName"
          placeholder="Requester Name"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <select
          name="cloudProvider"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="">Select Cloud Provider</option>
          <option value="AWS">AWS</option>
          <option value="Azure">Azure</option>
        </select>

        <input
          type="text"
          name="resourceType"
          placeholder="Resource Type"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <select
          name="environment"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="">Select Environment</option>
          <option value="Dev">Dev</option>
          <option value="Test">Test</option>
          <option value="Production">Production</option>
        </select>

        <textarea
          name="purpose"
          placeholder="Purpose"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="durationDays"
          placeholder="Duration Days"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="usageEstimate"
          placeholder="Usage Estimate"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <textarea
          name="accessJustification"
          placeholder="Access Justification"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="owner"
          placeholder="Owner"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Submit Request
        </button>

      </form>

    </div>
  );
}

export default RequestForm;