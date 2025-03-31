import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/users/register/", formData);
      alert("Signup Successful");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="signup-container" style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f4f4f4"
    }}>
      <h2 style={{ color: "#333" }}>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form" style={{
        display: "flex", flexDirection: "column", width: "300px", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
      }}>
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }} />
        <button type="submit" style={{
          padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px"
        }}>Signup</button>
      </form>
      <p className="login-link" style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
