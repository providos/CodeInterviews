import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import UserDetails from './components/UserDetails';
import Welcome from './components/Welcome';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
};

const AppContent = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      {user && (
        <header>
          <h1>User Management App</h1>
          <nav>
            <Link to="/welcome">Home</Link>
            <span>Welcome back {user.username}!</span>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>
      )}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/welcome" element={<Welcome user={user} />} />
        <Route path="/user-list" element={user ? <UserList /> : <Navigate to="/login" />} />
        <Route path="/user/:id" element={user ? <UserDetails /> : <Navigate to="/login" />} />
        <Route path="/create-user" element={user ? <CreateUser /> : <Navigate to="/login" />} />
        <Route path="/update/:id" element={user ? <UpdateUser /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
