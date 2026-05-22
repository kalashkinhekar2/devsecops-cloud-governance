import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
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
      await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );

      alert("Registration Successful");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
  <div className="home-page d-flex justify-content-center align-items-center">

    <div
      className="card p-5 shadow-lg"
      style={{
        width: "450px",
        borderRadius: "20px"
      }}
    >

      <h2 className="text-center mb-4">
        Register
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        
        <button className="btn btn-success w-100">
          Register
        </button>

      </form>

      <p className="mt-3 text-center">
        Already registered? <Link to="/login">Login</Link>
      </p>

    </div>

  </div>
);
}

export default Register;