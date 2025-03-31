import React from "react";

function NavBar({ handleLogout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><a href="/home" className="navbar-link">Home</a></li>
        <li><a href="/dashboard" className="navbar-link">Dashboard</a></li>
        <li><a href="/file-management" className="navbar-link">Upload Files</a></li>
        <li><a href="/profile" className="navbar-link">View/Update Profile</a></li>
        <li>
          <button onClick={handleLogout} className="navbar-logout-btn">
            Logout
          </button>
        </li>
      </ul>

      <style>
        {`
          .navbar {
            background-color: #333;
            padding: 15px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .navbar-list {
            display: flex;
            justify-content: space-around;
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

          .navbar-link {
            color: white;
            text-decoration: none;
            font-size: 18px;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .navbar-link:hover {
            background-color: #555;
          }

          .navbar-logout-btn {
            background-color: red;
            color: white;
            border: none;
            padding: 8px 15px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .navbar-logout-btn:hover {
            background-color: #cc0000;
          }

          .navbar-logout-btn:focus {
            outline: none;
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar;
