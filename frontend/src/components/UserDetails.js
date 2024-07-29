import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Fetching details for user ID:', id);
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      console.log('Making API call to fetch user details...');
      const response = await axios.get(`https://localhost:7276/user/getUser/${id}`);
      console.log('API response:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error("There was an error fetching the user!", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.first_name} {user.last_name}</h1>
      <p>Email: {user.email}</p>
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <div>
        <Link to={`/update/${user.id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default UserDetails;
