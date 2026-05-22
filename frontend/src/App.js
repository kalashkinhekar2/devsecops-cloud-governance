import "./App.css";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import RequestForm from "./components/RequestForm";
import RequestList from "./components/RequestList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const refreshRequests = () => {
    setRefresh(!refresh);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <BrowserRouter>
      {role &&
 window.location.pathname !== "/" &&
 window.location.pathname !== "/login" &&
 window.location.pathname !== "/register" && (
        <nav className="navbar navbar-dark bg-dark p-3">
          <div className="container">
            {role === "admin" && (
              <>
                <Link className="navbar-brand" to="/dashboard">
                  Dashboard
                </Link>

                <Link className="navbar-brand" to="/admin">
                  Admin Panel
                </Link>
              </>
            )}

            {role === "user" && (
  <>
    <Link className="navbar-brand" to="/create-request">
      Create Request
    </Link>

    <Link className="navbar-brand" to="/my-requests">
      My Requests
    </Link>
  </>
)}

            <Link className="navbar-brand" to="/login" onClick={logout}>
              Logout
            </Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login setRole={setRole} />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/create-request"
          element={
            role === "user"
              ? <RequestForm refreshRequests={refreshRequests} />
              : <Navigate to="/login" />
          }
        />


      <Route
  path="/my-requests"
  element={
    role === "user"
      ? (
        <RequestList
          refresh={refresh}
          refreshRequests={refreshRequests}
          userOnly={true}
        />
      )
      : <Navigate to="/login" />
  }
/>



        <Route
          path="/dashboard"
          element={
            role === "admin"
              ? <Dashboard refresh={refresh} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin"
          element={
            role === "admin"
              ? (
                <RequestList
                  refresh={refresh}
                  refreshRequests={refreshRequests}
                  isAdmin={true}
                  
                />
              )
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;