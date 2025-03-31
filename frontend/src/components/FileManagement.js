import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar component

function FileManagement() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("authToken");


  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // Handle file selection for upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to the backend
  const handleUpload = () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    axios.post("http://127.0.0.1:8000/api/files/upload/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setUploading(false);
      alert("File uploaded successfully!");
      setFile(null);
      fetchFiles();  // Refresh the file list
    })
    .catch(err => {
      setUploading(false);
      setError("Failed to upload file.");
      console.error("Error uploading file:", err);
    });
  };

  // Fetch list of uploaded files from the backend
  const fetchFiles = () => {
    axios.get("http://127.0.0.1:8000/api/files/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setFiles(response.data);
    })
    .catch(err => {
      setError("Failed to fetch files.");
      console.error("Error fetching files:", err);
    });
  };

  const handleDownload = (fileId) => {
    axios.get(`http://127.0.0.1:8000/api/files/download/${fileId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",  // Receive file as binary data
    })
    .then(response => {
      // Extract the Content-Disposition header and parse the filename
      const contentDisposition = response.headers['content-disposition'];
      
      // Check if Content-Disposition header is present and correctly formatted
      let fileName = 'downloaded-file'; // Default filename
      if (contentDisposition) {
        const matches = /filename="(.+)"/.exec(contentDisposition);
        if (matches && matches[1]) {
          fileName = matches[1];  // Extract filename from header
        }
      }
    
      // Create a Blob URL and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;  // Use the filename with the correct extension
      a.click();
    })
    .catch(err => {
      console.error("Error downloading file:", err);
    });
  };
  

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      {/* Include Navbar */}
      <Navbar handleLogout={handleLogout}/>

      <h3 style={styles.header}>File Management</h3>

      {/* File Upload Section */}
      <div style={styles.uploadSection}>
        <h4>Upload a File</h4>
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={styles.uploadButton}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {error && <p style={styles.errorText}>{error}</p>}
      </div>

      {/* File List Section */}
      <div style={styles.fileListSection}>
        <h4>Uploaded Files</h4>
        {files.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Filename</th>
                <th style={styles.tableHeader}>Upload Date</th>
                <th style={styles.tableHeader}>File Type</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{file.filename}</td>
                  <td style={styles.tableCell}>{new Date(file.upload_date).toLocaleString()}</td>
                  <td style={styles.tableCell}>{file.file_type}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleDownload(file.id)}
                      style={styles.downloadButton}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  uploadSection: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  fileInput: {
    padding: '10px',
    marginRight: '10px',
    width: '250px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  uploadButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  fileListSection: {
    marginTop: '40px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableHeaderRow: {
    backgroundColor: '#f8f9fa',
    textAlign: 'left',
  },
  tableHeader: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
  },
  downloadButton: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default FileManagement;
