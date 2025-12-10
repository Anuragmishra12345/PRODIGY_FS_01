import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api/auth';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for token and role on mount and when storage changes
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(userRole);
  }, []);

  // Use a simple listener to update state when navigating or logging in/out
  const handleStorageChange = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(userRole);
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const onLogout = () => {
    setAuthToken(null); // Clears the token in local storage and Axios headers
    alert('Logged out successfully!');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        🔒 **Prodigy Auth**
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            {role === 'admin' && (
              <Link to="/admin" style={styles.navItem}>
                Admin
              </Link>
            )}
            <Link to="/dashboard" style={styles.navItem}>
              Dashboard
            </Link>
            <button onClick={onLogout} style={styles.navButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" style={styles.navItem}>
              Register
            </Link>
            <Link to="/login" style={styles.navItem}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Simple Styles for illustration
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1f2937',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    color: '#34d399',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'background 0.3s',
  },
  navButton: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '1rem',
    fontWeight: 'bold',
  },
};

export default Navbar;