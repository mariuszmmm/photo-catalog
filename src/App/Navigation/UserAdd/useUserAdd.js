import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch";

export const useUserAdd = (setShowUserAddBackdrop) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userAddAPI } = useFetch();

  const setInputChange = ({ target }) => {
    const { name, value } = target;
    name === "username" && setUsername(value);
    name === "password" && setPassword(value);
  };

  const userAdd = async (event) => {
    event.preventDefault();
    const response = await userAddAPI(username, password);
    if (response) {
      setUsername("");
      setPassword("");
      setShowUserAddBackdrop(false);
    };
  };

  return {
    username,
    password,
    userAdd,
    setInputChange,
  }
};