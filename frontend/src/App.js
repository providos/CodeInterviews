import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>User Management App</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create User</Link>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/update/:id" element={<UpdateUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
