import { useState } from "react";
import { useFetch } from "../../Fetch/useFetch"

const useLogin = (setState, setSession, setLoading, setShowBackdrop) => {
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
    setLoading(true);
    try {
      const data = await loginAPI(username, password);

      if (data) {
        const { decodedToken, visitCount } = data;
        const remaining = decodedToken.exp - decodedToken.iat;
        setSession({
          sessionTime: { end: decodedToken.exp, remaining }
        });
        setState(prevState => (
          {
            ...prevState,
            user: {
              isLoggedIn: true,
              username: decodedToken.username,
              isAdmin: decodedToken.isAdmin,
            },
            visitCount
          }
        ))
        setShowBackdrop(null);
      };
    } catch (error) {
      console.error("Error during login:", error);
      alert("Wystąpił błąd podczas logowania. Sprawdź swoje dane logowania i spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    onInputChange,
    login,
  };
};

export default useLogin;