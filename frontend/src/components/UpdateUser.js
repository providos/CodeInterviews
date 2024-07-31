import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../apiauth/axios';
import '../style/UpdateUser.css'; // Import the CSS file
import '../style/Modal.css'; // Import the CSS file
import Modal from 'react-modal';

function UpdateUser() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);
  const [modalStatusCode, setModalStatusCode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('UpdateUser - Fetching user details for update, ID:', id);
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    setModalContent(null);
    try {
      console.log('UpdateUser - Making API call to fetch user details for update...');
      const response = await api.get(`/user/getUser/${id}`);
      console.log('UpdateUser - API response:', response.data);
      const user = response.data;
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
      setName(user.name || '');
      setJob(user.job || '');
      setModalStatusCode(response.status);
      setModalContent(user);
      setShowModal(true);
    } catch (error) {
      console.error("UpdateUser - There was an error fetching the user!", error);
      setModalStatusCode(error.response ? error.response.status : 'Unknown error');
      setModalContent(error.response ? error.response.data : 'Unknown error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('UpdateUser - Submitting updated user:', { id, firstName, lastName, email, name, job });
    try {
      console.log('UpdateUser - Making API call to update user...');
      const response = await api.put(`/user/updateUser/${id}`, { firstName, lastName, email, name, job });
      console.log('UpdateUser - User updated successfully');
      setModalStatusCode(response.status);
      setModalContent(response.data);
      setShowModal(true);
      navigate(`/user/${id}`);
    } catch (error) {
      console.error("UpdateUser - There was an error updating the user!", error);
      setModalStatusCode(error.response ? error.response.status : 'Unknown error');
      setModalContent(error.response ? error.response.data : 'Unknown error');
      setShowModal(true);
    }
  };

  return (
    <div className="update-user-container">
      <div className="update-user-form">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Job</label>
            <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
          </div>
          <button type="submit" className="update-button">Update</button>
        </form>
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
  );
}

export default UpdateUser;
