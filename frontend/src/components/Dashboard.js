import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming you have a Navbar component

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const token = localStorage.getItem('authToken');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  // Fetch the dashboard data on component mount
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/files/dashboard/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((err) => {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      });
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      <h3 style={styles.header}>Dashboard</h3>

      {/* Dashboard Content */}
      {dashboardData ? (
        <div style={styles.dashboardContainer}>
          {/* Row 1: Total Files Uploaded and File Types Breakdown (All Users) */}
          <div style={styles.row}>
            <div style={styles.card}>
              <h4>Total Files Uploaded by All Users</h4>
              <p style={styles.total}>{dashboardData.total_files}</p>
            </div>

            <div style={styles.card}>
              <h4>File Types Breakdown (All Users)</h4>
              <ul style={styles.list}>
                {Object.keys(dashboardData.file_type_count).map((fileType) => (
                  <li key={fileType} style={styles.listItem}>
                    {fileType}: {dashboardData.file_type_count[fileType]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2: File Type Breakdown by User */}
          <div style={styles.row}>
            {Object.keys(dashboardData.user_file_type_count).map((userId) => (
              <div key={userId} style={styles.userCard}>
                <h5><b>Username: </b> {dashboardData.user_names[userId]} (Total: {dashboardData.user_file_count[userId]} files)</h5>
                <ul style={styles.list}>
                  {Object.keys(dashboardData.user_file_type_count[userId]).map((fileType) => (
                    <li key={fileType} style={styles.listItem}>
                      {fileType}: {dashboardData.user_file_type_count[userId][fileType]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading dashboard...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    color: '#333',
  },
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flexBasis: '48%',  
    minWidth: '300px', 
    textAlign: 'center',
  },
  total: {
    fontSize: '2rem',
    color: '#007bff',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#555',
  },
  userCard: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    flexBasis: '23%', 
    minWidth: '250px',
    marginBottom: '20px',
    textAlign: 'center',
  },
};

export default Dashboard;
