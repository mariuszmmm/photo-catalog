import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch"

const useLogin = (setState, setShowLoginBackdrop) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginAPI } = useFetch();


  const onInputChange = ({ target }) => {
    const { name, value } = target;
    name === "username" && setUsername(value);
    name === "password" && setPassword(value);
  };

  const login = async (event) => {
    event.preventDefault();

    const data = await loginAPI(username, password);
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
      setShowLoginBackdrop(false);
    };
  };

  return {
    username,
    password,
    onInputChange,
    login,
  };
};

export default useLogin;