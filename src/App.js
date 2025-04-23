import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login'
import Dashboard from './views/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useEffect, useState } from 'react';



const App= () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    } else {
      setIsAuthenticated(false); // No token means not authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
      <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />
          <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} 
        />
      </Routes>
    </Router>
  
  );
}

export default App;
