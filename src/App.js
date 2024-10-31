import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CsvUploadPage from './components/routes/CsvUploadPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CsvUploadPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
