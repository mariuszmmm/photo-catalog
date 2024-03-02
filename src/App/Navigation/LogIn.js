import Button from "../../common/Button";

export const LogIn = ({ setShowLoginForm }) => {
  const loginFormHandler = () => {
    setShowLoginForm(true);
  };

  return (
    <Button onClick={loginFormHandler}>Log in</Button>
  );
};