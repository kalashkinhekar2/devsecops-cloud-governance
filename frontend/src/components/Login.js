import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setRole }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("role", response.data.role);

      localStorage.setItem("email", formData.email);

      setRole(response.data.role);

      alert("Login Successful");

      if (response.data.role === "admin") {

        navigate("/dashboard");

      } else {

        navigate("/create-request");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

      console.log(error.response?.data);
    }
  };

  return (

    <div className="home-page d-flex justify-content-center align-items-center">

      <div
        className="card p-5 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px"
        }}
      >

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

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

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <p className="mt-3 text-center">
          New user? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;