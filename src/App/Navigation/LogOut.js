import Button from "../../common/Button";

export const LogOut = ({ setState, setShowLoginForm }) => {

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setState((prevState) => ({
      ...prevState,
      loading: false,
      isLoggedIn: false,
      username: undefined,
      isAdmin: false,
    }));
    setShowLoginForm(false);
  };

  return <Button onClick={handleLogout}>Log out</Button>
};
