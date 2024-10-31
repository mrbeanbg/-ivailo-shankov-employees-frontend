import React, { useState } from 'react';
import EmployeeAssignmentsService from '../../services/employeesAssignments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CsvUploadPage = () => {
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a CSV file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError(null);

      const response = await EmployeeAssignmentsService.uploadCsv(formData);
      setResponseData(response.data);
    } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.errors) {
            err.response.data.errors.forEach((error) => {
              toast.error(`${error.errorMessage}`);
            });
        } else {
            toast.error('Failed to upload file. Please try again.');
        }
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (index) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((i) => i !== index)
        : [...prevExpandedRows, index]
    );
  };

  return (
    <div>
      <h2>CSV Employees to Projects Assignments File Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <ToastContainer />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
        <center>
            <h3>Projects Worked Together</h3>
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>Employee 1 ID</th>
                    <th>Employee 2 ID</th>
                    <th>Project ID</th>
                    <th>Days Working Together</th>
                    <th>More Info</th>
                </tr>
                </thead>
                <tbody>
                {responseData.map((data, index) => (
                    <React.Fragment key={index}>
                    <tr>
                        <td>{data.employee1.employeeId}</td>
                        <td>{data.employee2.employeeId}</td>
                        <td>{data.projectId}</td>
                        <td>{data.daysWorkingTogether}</td>
                        <td>
                        <button onClick={() => toggleRow(index)}>
                            {expandedRows.includes(index) ? 'Hide Info' : 'More Info'}
                        </button>
                        </td>
                    </tr>
                    {expandedRows.includes(index) && (
                        <tr>
                        <td colSpan="5">
                            <strong>Employee 1:</strong>
                            <div>Employee ID: {data.employee1.employeeId}</div>
                            <div>Project ID: {data.employee1.projectId}</div>
                            <div>Date From: {data.employee1.dateFrom}</div>
                            <div>Date To: {data.employee1.dateTo}</div>
                            <br />
                            <strong>Employee 2:</strong>
                            <div>Employee ID: {data.employee2.employeeId}</div>
                            <div>Project ID: {data.employee2.projectId}</div>
                            <div>Date From: {data.employee2.dateFrom}</div>
                            <div>Date To: {data.employee2.dateTo}</div>
                        </td>
                        </tr>
                    )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
          </center>
        </div>
      )}
    </div>
  );
};

export default CsvUploadPage;
