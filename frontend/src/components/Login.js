import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", formData);

      if (response.data.token) {
        alert(response.data.message);
        localStorage.setItem("authToken", response.data.token);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      alert("Login failed. Invalid credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="login-links">
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>

      <style>
        {`
          .login-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
            background: #f4f4f4;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .login-form input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          .login-form button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 18px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .login-form button:hover {
            background-color: #0056b3;
          }

          .login-links p {
            margin: 10px 0;
          }

          .login-links a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }

          .login-links a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
}

export default Login;