import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiauth/axios';
import '../style/CreateUser.css';
import '../style/Modal.css'; // Import the CSS file
import Modal from 'react-modal';

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);
  const [modalStatusCode, setModalStatusCode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    setModalContent(null);
    e.preventDefault();
    try {
      const response = await api.post('/user/createUser', { firstName, lastName, email });
      console.log('User created successfully:', response.data);
      setModalStatusCode(response.status);
      setModalContent(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('There was an error creating the user!', error);
      setModalStatusCode(error.response ? error.response.status : 'Unknown error');
      setModalContent(error.response ? error.response.data : 'Unknown error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/user-list');
  };

  return (
    <div className="create-user-container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
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
  );
};

export default CreateUser;
