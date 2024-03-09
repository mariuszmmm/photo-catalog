import axios from "axios";
import { useState } from "react";

const usePasswordChange = ({ state, setShowPasswordChangeModal }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const setInputChange = ({ target }) => {
    const { name, value } = target;
    name === "password" && setPassword(value);
    name === "newPassword" && setNewPassword(value);
  }

  const passwordChange = async (event) => {
    event.preventDefault();

    const response = await axios.post(state.username, password, newPassword);
    response && setShowPasswordChangeModal(false);
  };

  return {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  }

}

export default usePasswordChange;