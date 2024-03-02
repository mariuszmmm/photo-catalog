import Button from "../../common/Button";

export const LogOut = ({ setState, setShowLoginForm }) => {

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setState((prevState) => ({
      ...prevState,
      loading: false,
      isLoggedIn: false,
      user: undefined,
      isAdmin: false,
      items: []
    }));
    setShowLoginForm(false);
  };

  return <Button onClick={handleLogout}>Log out</Button>

};