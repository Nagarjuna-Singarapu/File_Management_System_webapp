import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar"; // Import NavBar component

function Profile() {
  const [profile, setProfile] = useState({ username: "", first_name: "", last_name: "", email: "", phone: "", addresses: [] });
  const [error, setError] = useState(""); // Error state
  const [newAddress, setNewAddress] = useState(""); // For storing new address input
  const navigate = useNavigate();

  // Fetch user profile and addresses
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    // Fetch profile
    axios.get("http://127.0.0.1:8000/api/users/profile/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProfile((prevProfile) => ({ ...prevProfile, ...res.data }));
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      });

    // Fetch addresses
    axios.get("http://127.0.0.1:8000/api/users/addresses/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProfile((prevProfile) => ({ ...prevProfile, addresses: res.data || [] }));
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
      });
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // Handle deleting an address
  const handleDeleteAddress = (addressId) => {
    const token = localStorage.getItem("authToken");
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    axios.delete(`http://127.0.0.1:8000/api/users/addresses/${addressId}/`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          addresses: prevProfile.addresses.filter((addr) => addr.id !== addressId),
        }));
      })
      .catch((err) => {
        console.error("Error deleting address:", err);
      });
  };

  // Handle adding a new address
  const handleAddAddress = () => {
    const token = localStorage.getItem("authToken");
    if (!newAddress.trim()) {
      alert("Please enter an address.");
      return;
    }

    axios.post("http://127.0.0.1:8000/api/users/addresses/", { address: newAddress }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          addresses: [...prevProfile.addresses, res.data],
        }));
        setNewAddress("");
      })
      .catch((err) => {
        console.error("Error adding address:", err);
      });
  };

  return (
    <div className="profile-container">
      <NavBar handleLogout={handleLogout} />
      <h2>Profile</h2>
      {error && <p className="error">{error}</p>}
      <div className="profile-details">
        <div className="profile-section">
          <p><b>Username:</b> {profile.username}</p>
          <p><b>First Name:</b> {profile.first_name}</p>
          <p><b>Last Name:</b> {profile.last_name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Phone:</b> {profile.phone || "Not provided"}</p>
        </div>
        <div className="address-section">
          <h3>Addresses:</h3>
          {profile.addresses.length > 0 ? (
            <ul className="address-list">
              {profile.addresses.map((addr) => (
                <li key={addr.id} className="address-list-item">
                  {addr.address}
                  <button onClick={() => handleDeleteAddress(addr.id)} className="delete-button">Delete</button>
                </li>
              ))}
            </ul>
          ) : (<p>No addresses available</p>)}
          <div className="address-input-group">
            <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Enter new address" className="input" />
            <button onClick={handleAddAddress} className="add-button">Add Address</button>
          </div>
        </div>
        <div className="edit-profile-button-container">
          <button onClick={() => navigate("/update-profile")} className="edit-profile-button">Edit Profile</button>
        </div>
      </div>
      
      <style>
        {`
          .profile-container {
            margin: 10px auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            font-family: 'Georgia', serif;
          }

          h2 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }

          .error {
            color: red;
          }

          .profile-details {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .profile-section, .address-section {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          }

          .address-list {
            list-style-type: none;
            padding: 0;
          }

          .address-list-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }

          .delete-button {
            background-color: #e74c3c;
            color: white;
            border: none;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 4px;
            transition: background 0.3s;
          }

          .delete-button:hover {
            background-color: #c0392b;
          }

          .address-input-group {
            display: flex;
            margin-top: 15px;
          }

          .input {
            padding: 8px;
            width: 70%;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .add-button {
            padding: 8px 12px;
            background: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            margin-left: 10px;
            border-radius: 4px;
          }

          .add-button:hover {
            background-color: #218838;
          }

          .edit-profile-button-container {
            margin-top: 20px;
            text-align: center;
          }

          .edit-profile-button {
            padding: 10px 20px;
            background-color: #ff9800;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .edit-profile-button:hover {
            background-color: #f57c00;
          }
        `}
      </style>
    </div>
  );
}

export default Profile;
