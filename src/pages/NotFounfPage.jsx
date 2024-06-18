// src/pages/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/NotFoundPage.css'; // Import CSS file for styling

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div className="links-container">
        <Link to="/" className="link">Popular</Link>
        <Link to="/toprated" className="link">Top Rated</Link>
        <Link to="/upcoming" className="link">Upcoming</Link>
      <p>👆 &nbsp; Click Above.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
