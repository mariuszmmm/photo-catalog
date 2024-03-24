import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch"

const useLogin = (setState, setShowBackdrop) => {
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
      const { decodedToken, visitCount } = data;
      const remaining = decodedToken.exp - decodedToken.iat;
      setState(prevState => (
        {
          ...prevState,
          user: {
            isLoggedIn: true,
            username: decodedToken.username,
            isAdmin: decodedToken.isAdmin,
          },
          sessionTime: {
            end: decodedToken.exp,
            remaining,
          },
          visitCount
        }
      ))
      setShowBackdrop(null);
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