import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar"; // Import NavBar component

function UpdateProfile() {
  const [profile, setProfile] = useState(null); // Store user profile data
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/users/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setUpdatedProfile(res.data); // Initialize with current profile data
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    // Only update the profile fields (username, first name, last name, email)
    const updatedUserProfile = {
      username: updatedProfile.username,
      first_name: updatedProfile.first_name,
      last_name: updatedProfile.last_name,
      email: updatedProfile.email,
      phone: updatedProfile.phone, 
    };

    axios
      .put("http://127.0.0.1:8000/api/users/profile/", updatedUserProfile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setUpdatedProfile(res.data); // Update the profile with the new data
        navigate("/profile"); // Redirect back to the profile page after saving
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Failed to update profile.");
        setTimeout(() => setError(""), 5000);
      });
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="update-profile-container">
      <NavBar handleLogout={() => navigate("/login")} />
      <h2>Update Profile</h2>

      {error && <p className="error">{error}</p>}

      <div className="update-profile-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={updatedProfile.username || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={updatedProfile.first_name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={updatedProfile.last_name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedProfile.email || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={updatedProfile.phone || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="submit-button-container">
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .update-profile-container {
            margin: 40px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            font-family: 'Georgia', serif;
          }

          h2 {
            text-align: center;
            font-size: 28px;
            color: #333;
            margin-bottom: 20px;
          }

          .error {
            color: red;
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
          }

          .update-profile-form {
            max-width: 600px;
            margin: 0 auto;
          }

          .input-group {
            margin-bottom: 15px;
          }

          .input-group label {
            display: block;
            font-size: 16px;
            margin-bottom: 5px;
            color: #555;
          }

          .input-group input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
          }

          .input-group input:focus {
            outline: none;
            border-color: #007bff;
          }

          .submit-button-container {
            text-align: center;
            margin-top: 20px;
          }

          .submit-button {
            padding: 12px 25px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .submit-button:hover {
            background-color: #0056b3;
          }

          .submit-button:focus {
            outline: none;
          }
        `}
      </style>
    </div>
  );
}

export default UpdateProfile;
