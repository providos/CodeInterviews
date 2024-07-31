import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Welcome.css'; // Create and import a CSS file for the welcome page

const Welcome = ({ user }) => {
  return (
    <div className="welcome-container">
      <h2>Hi, {user ? user.username : 'Guest'}!</h2>
      <div className="welcome-box">
        <Link to="/user-list" className="welcome-button">User List</Link>
        <Link to="/create-user" className="welcome-button">Create User</Link>
      </div>
    </div>
  );
};

export default Welcome;
