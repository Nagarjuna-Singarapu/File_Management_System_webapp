import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { useState, useEffect } from "react";
import HomePage from "./components/Homepage";
import UpdateProfile from "./components/UpdateProfile";
import FileManagement from "./components/FileManagement";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") !== null);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        {/* Only show Profile if the user is logged in */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Login />} />
        <Route path="/update-profile" element={isLoggedIn ? <UpdateProfile /> : <Login />} />
        <Route path="/file-management" element={isLoggedIn ? <FileManagement /> : <Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
