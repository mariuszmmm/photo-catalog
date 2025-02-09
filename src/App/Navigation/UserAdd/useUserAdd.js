import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch";

export const useUserAdd = (setLoading, setShowBackdrop) => {
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
    try {
      setLoading(true);
      const response = await userAddAPI(username, password);
      if (response) {
        setUsername("");
        setPassword("");
        response.status === 201 && setShowBackdrop(null);
      };
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Wystąpił błąd podczas dodawania użytkownika. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    };
  };


  return {
    username,
    password,
    userAdd,
    setInputChange,
    setUsername,
    setPassword,
  }
};