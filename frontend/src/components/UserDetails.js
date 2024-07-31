import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../apiauth/axios';
import '../style/UserDetails.css';
import '../style/Modal.css'; // Import the CSS file
import Modal from 'react-modal';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalStatusCode, setModalStatusCode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('UserDetails - Fetching details for user ID:', id);
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    setModalContent(null);
    try {
      console.log('UserDetails - Making API call to fetch user details...');
      const response = await api.get(`https://localhost:7276/user/getUser/${id}`);
      console.log('UserDetails - API response:', response.data);
      setUser(response.data);
      setModalStatusCode(response.status);
      setModalContent(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("UserDetails - There was an error fetching the user!", error);
      setModalStatusCode(error.response ? error.response.status : 'Unknown error');
      setModalContent(error.response ? error.response.data : 'Unknown error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details-container">
      <div className="user-details-box">
        <h1>{user.first_name} {user.last_name}</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
        <div>
        <Link to={`/update/${user.id}`}>
          <button className="edit-button">Edit</button>
        </Link>

        </div>
        <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Response Modal"
        className="content-modal"
        overlayClassName="content-modal-overlay"
      >
        <h2>Response Status: {modalStatusCode}</h2>
        <pre>{JSON.stringify(modalContent, null, 2)}</pre>
        <button onClick={closeModal}>Close</button>
      </Modal>
      </div>
    </div>
  );
}

export default UserDetails;
