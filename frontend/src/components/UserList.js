import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../apiauth/axios';
import '../style/UserList.css'; // Import the CSS file
import '../style/Modal.css'; // Import the CSS file
import Modal from 'react-modal';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('UserList - Fetching users for page:', page);
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);
    try {
      console.log('UserList - Making API call to fetch users...');
      const response = await api.get(`/user/getUsers/${page}`);
      console.log('UserList - API response:', response.data);
      const transformedUsers = response.data.map(user => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatar: user.avatar
      }));
      setUsers(transformedUsers);
      console.log('UserList - Transformed users:', transformedUsers);
    } catch (error) {
      console.error("UserList - There was an error fetching the users!", error);
      setError(error.response ? error.response.data : 'Unknown error occurred');
      setShowModal(true);
    } finally {
      setLoading(false);
      console.log('UserList - Finished fetching users');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPage(page => Math.max(page - 1, 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>User List</h1>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-list-item">
            <Link to={`/user/${user.id}`}>{user.firstName} {user.lastName}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page => page + 1)}>Next</button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="content-modal"
        overlayClassName="content-modal-overlay"
      >
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default UserList;
