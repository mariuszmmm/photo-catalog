import { useState } from "react";
import { useFetch } from "../../api/useFetch"

const useLogInForm = (setState, setShowLoginModal) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logInAPI } = useFetch();


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    name === "username" && setUsername(value);
    name === "password" && setPassword(value);
  };

  const login = async (event) => {
    event.preventDefault();

    const data = await logInAPI(username, password);
    if (data) {
      const time = new Date(data.iat).getTime();
      const remainingSessionTime = data.exp - time;
      setState(prevState => (
        {
          ...prevState,
          isLoggedIn: true,
          username: data.username,
          isAdmin: data.isAdmin,
          sessionTime: data.exp,
          remainingSessionTime
        }
      ))
      setShowLoginModal(false);
    };
  };

  return {
    username,
    password,
    onInputChange,
    login,
  };
};

export default useLogInForm;