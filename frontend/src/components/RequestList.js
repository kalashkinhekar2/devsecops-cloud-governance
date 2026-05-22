import React, { useEffect, useState } from "react";
import axios from "axios";

function RequestList({ refresh, refreshRequests, userOnly,isAdmin}) {

  const [requests, setRequests] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {

    fetchRequests();

  }, [refresh]);

  const fetchRequests = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8000/api/requests"
      );

      setRequests(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await axios.patch(
        `http://localhost:8000/api/requests/${id}/status`,
        {
          status,
          reviewerComments: `${status} by reviewer`
        }
      );

      fetchRequests();

      refreshRequests();

    } catch (error) {

      console.log(error);
    }
  };

  const filteredRequests = requests.filter((req) => {


   if (userOnly && req.requesterEmail !== localStorage.getItem("email")) {
    return false;
  } 


    if (!statusFilter) return true;

    return req.status === statusFilter;
  });

  return (

    <div className="container mt-5">

      <h2>All Resource Requests</h2>

      <select
        className="form-control mb-3"
        onChange={(e) => setStatusFilter(e.target.value)}
      >

        <option value="">All Status</option>

        <option value="Submitted">Submitted</option>

        <option value="Approved">Approved</option>

        <option value="Rejected">Rejected</option>

      </select>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Requester</th>
            <th>Cloud</th>
            <th>Resource</th>
            <th>Status</th>
            <th>Cost</th>
           {isAdmin && <th>Actions</th>}
          </tr>

        </thead>

        <tbody>

          {filteredRequests.map((req) => (

            <tr key={req._id}>

              <td>{req.requesterName}</td>

              <td>{req.cloudProvider}</td>

              <td>{req.resourceType}</td>

              <td>

  <span
    className={
      req.status === "Approved"
        ? "badge bg-success"
        : req.status === "Rejected"
        ? "badge bg-danger"
        : "badge bg-secondary"
    }
  >
    {req.status}
  </span>

</td>

              <td>

  <span
    className={
      req.costCategory === "High"
        ? "badge bg-danger"
        : req.costCategory === "Medium"
        ? "badge bg-warning text-dark"
        : "badge bg-success"
    }
  >
    {req.costCategory}
  </span>

</td>

{isAdmin && (
              <td>

                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() =>
                    updateStatus(req._id, "Approved")
                  }
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    updateStatus(req._id, "Rejected")
                  }
                >
                  Reject
                </button>

              </td>
)}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RequestList;