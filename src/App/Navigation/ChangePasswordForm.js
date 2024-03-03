import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../api/api";
import { getSessionStorage } from '../sessionStorage';
import { Input } from './styled';
import Button from '../../common/Button';
import Form from '../../common/Form';


const ChangePasswordForm = ({ setShowChangePasswordForm, state }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const oldPasswordChange = ({ target }) => {
    setIncorrectLogin(false);
    setOldPassword(target.value)
  }

  const newPasswordChange = ({ target }) => {
    setIncorrectLogin(false);
    setNewPassword(target.value)
  }

  const passwordChange = async (event) => {
    event.preventDefault();

    try {
      const token = getSessionStorage("token")
      const request = await axios.post(
        `${API_URL}/user/password`,
        { username: state.username, oldPassword, newPassword },
        { headers: { Authorization: token } }
      );
      console.log(request);
      if (request.status === 200) {
        alert("HASŁO ZMIENIONO POMYŚLNIE")
      }
      setShowChangePasswordForm(false)
    } catch (error) {
      const status = error.response.status;
      if (status === 400) {
        alert("WPROWADŹ HASŁA")
      } else if (status === 401) {
        setIncorrectLogin(true)
        alert("HASŁO NIEPOPRAWNE")
      } else if (status === 403) {
        alert("ZABRONIONA ZMIANA HASŁA ADMINISTORA")
      } else {
        alert("BŁĄD ZMIANY HASŁA")
      }
    }
  };

  return (
    <Form onSubmit={passwordChange}>
      <Input
        $hidden
        type="text"
        autoComplete="username"
      />
      <p>old password:</p>
      <Input
        type="password"
        placeholder="old password"
        value={oldPassword}
        autoComplete="current-password"
        $incorrect={incorrectLogin}
        onChange={oldPasswordChange}
      />
      <p>new password:</p>
      <Input
        type="password"
        placeholder="new password"
        value={newPassword}
        $incorrect={incorrectLogin}
        autoComplete="new-password"
        onChange={newPasswordChange}
      />
      <Button type="submit">Save</Button>
      <Button type="button" onClick={() => setShowChangePasswordForm(false)} >Anuluj</Button>
    </Form>


  );
};

export default ChangePasswordForm;