import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@material-ui/core';
import UserPosts from './UserPosts';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setConnectionError(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setConnectionError(true);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleRowClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className='container'>
      <div className='user-list'>
        <TextField label="Search by name or email" onChange={handleSearchChange} />
        {connectionError ? (
          <p style={{ color: 'red' }}>Connection error. Please try again later.</p>
        ) : isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} onClick={() => handleRowClick(user.id)} style={{ cursor: 'pointer' }}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      {selectedUserId && <UserPosts userId={selectedUserId} />}
    </div>
  );
};

export default UsersTable;