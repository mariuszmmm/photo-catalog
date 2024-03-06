// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../api/api";
import { getSessionStorage } from '../../sessionStorage';
import Form from '../../../common/Form';
import { Input } from '../styled';
import Button from '../../../common/Button';
import Loader from '../../../common/Loader';

export const AddUserForm = ({ setShowAddUserForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async (event) => {
    event.preventDefault();
    const token = getSessionStorage("token")
    try {
      const response = await axios.post(
        `${API_URL}/user/add`,
        { username, password },
        { headers: { Authorization: token } }
      );
      if (response.status === 201) {
        alert(response.data.message)
      }
      setShowAddUserForm(false);
    } catch (error) {

      if (error.response.status === 409) {
        alert(error.response.data.message)
      }
    }
  };

  return (
    <Loader>
      <Form onSubmit={addUser}>
        <div>
        <p>user:</p>
        <Input
          type="text"
          placeholder="user"
          value={username}
          autoComplete="username"
          // $incorrect={incorrectLogin}
          onChange={e => setUsername(e.target.value)}
        />
        </div>
        <div>
        <p>password:</p>
        <Input
          type="password"
          placeholder="password"
          value={password}
          // $incorrect={incorrectLogin}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        </div>
        <Button type="submit" >Save</Button>
        <Button type="button" onClick={() => setShowAddUserForm(false)} >Anuluj</Button>
      </Form>
    </Loader>

  );
};
