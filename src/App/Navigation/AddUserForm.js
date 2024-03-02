// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../api/api";
import { getSessionStorage } from '../sessionStorage';
import Form from '../../common/Form';
import { Input } from './styled';
import Button from '../../common/Button';

export const AddUserForm = ({ setShowAddUserForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async (event) => {
    event.preventDefault();
    const token = getSessionStorage("token")
    try {
      await axios.post(
        `${API_URL}/user/add`,
        { username, password },
        { headers: { Authorization: token } }
      );
      console.log("zmiana hasła")
      setShowAddUserForm(false);
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Form onSubmit={addUser}>
      <p>user:</p>
      <Input
        type="text"
        placeholder="user"
        value={username}
        autoComplete="username"
        // $incorrect={incorrectLogin}
        onChange={e => setUsername(e.target.value)}
      />
      <p>password:</p>
      <Input
        type="password"
        placeholder="password"
        value={password}
        // $incorrect={incorrectLogin}
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit" >Add user</Button>
    </Form>
  );
};

export default AddUserForm;
