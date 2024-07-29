import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching users for page:', page);
    fetchUsers(page);
  }, [page]); // Only re-run the effect if page changes

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Making API call to fetch users...');
      const response = await axios.get(`https://localhost:7276/user/getUsers/${page}`);
      console.log('API response:', response.data);
      const transformedUsers = response.data.map(user => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatar: user.avatar
      }));
      setUsers(transformedUsers);
      console.log('Transformed users:', transformedUsers);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
      setError("There was an error fetching the users!");
    } finally {
      setLoading(false);
      console.log('Finished fetching users');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.firstName} {user.lastName}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default UserList;
