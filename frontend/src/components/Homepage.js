import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <NavBar handleLogout={handleLogout} />
      <h1>Welcome to Our File Management System</h1>
      <p>
        This website allows you to manage your files, view your profile, and
        keep track of your uploads. Please select an option below to get started.
      </p>
      <div className="button-container">
        <button onClick={() => navigate("/dashboard")} className="home-button">Go to Dashboard</button>
        <button onClick={() => navigate("/file-management")} className="home-button">Upload Files</button>
        <button onClick={() => navigate("/profile")} className="home-button">View/Update Profile</button>
      </div>

      <style>
        {`
          .home-container {
            margin: 20px auto;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Georgia', serif;
          }

          h1 {
            text-align: center;
            font-size: 32px;
            color: #333;
            margin-bottom: 20px;
          }

          p {
            text-align: center;
            font-size: 18px;
            color: #555;
            margin-bottom: 30px;
          }

          .button-container {
            display: flex;
            justify-content: center;
            gap: 20px;
          }

          .home-button {
            padding: 12px 20px;
            font-size: 16px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .home-button:hover {
            background-color: #0056b3;
          }

          .home-button:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;
