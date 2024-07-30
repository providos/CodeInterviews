import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('CreateUser - Submitting new user:', { firstName, lastName, email });
    try {
      console.log('CreateUser - Making API call to create user...');
      await axios.post('https://localhost:7276/user/createUser', { firstName, lastName, email });
      console.log('CreateUser - User created successfully');
      navigate('/');
    } catch (error) {
      console.error("CreateUser - There was an error creating the user!", error);
    }
  };

  return (
    <div>
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
        <div style={{ textAlign: 'center' }}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
