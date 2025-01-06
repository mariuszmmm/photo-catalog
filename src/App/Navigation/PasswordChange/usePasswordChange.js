import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch";

const usePasswordChange = (state, setLoading, setShowBackdrop) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { passwordChangeAPI } = useFetch();

  const setInputChange = ({ target }) => {
    const { name, value } = target;
    name === "password" && setPassword(value);
    name === "newPassword" && setNewPassword(value);
  }

  const passwordChange = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await passwordChangeAPI(state.user.username, password, newPassword);
      if (response) {
        setPassword("");
        setNewPassword("");
        setShowBackdrop(null);
      };
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  }
};

export default usePasswordChange;