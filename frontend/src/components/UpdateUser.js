import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching user details for update, ID:', id);
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      console.log('Making API call to fetch user details for update...');
      const response = await axios.get(`https://localhost:7276/user/getUser/${id}`);
      console.log('API response:', response.data);
      const user = response.data;
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setName(user.name);
      setJob(user.job);
    } catch (error) {
      console.error("There was an error fetching the user!", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting updated user:', { id, firstName, lastName, email, name, job });
    try {
      console.log('Making API call to update user...');
      await axios.put(`https://localhost:7276/user/updateUser/${id}`, { firstName, lastName, email, name, job });
      console.log('User updated successfully');
      navigate(`/user/${id}`);
    } catch (error) {
      console.error("There was an error updating the user!", error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
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
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Job</label>
          <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
