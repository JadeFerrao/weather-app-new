import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;