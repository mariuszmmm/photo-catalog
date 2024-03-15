import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch";

const usePasswordChange = (state, setShowBackdrop) => {
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

    const response = await passwordChangeAPI(state.user.username, password, newPassword);
    if (response) {
      setPassword("");
      setNewPassword("");
      setShowBackdrop(null);
    };
  };

  return {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  }
};

export default usePasswordChange;