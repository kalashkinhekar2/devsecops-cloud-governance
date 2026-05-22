import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="container text-center py-5">

        <h1 className="display-4 fw-bold">
          Cloud Resource Governance System
        </h1>

        <p className="lead mt-3">
          Request, review, approve, and track AWS/Azure cloud resources.
        </p>

        <div className="mt-4">

          <Link
            to="/login"
            className="btn btn-primary btn-lg me-3"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn btn-outline-light btn-lg"
          >
            Register
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Home;