import Button from "../../common/Button";

export const ChangePassword = ({ setChangePasswordForm }) => {
  const changePasswordHendler = () => {
    setChangePasswordForm(true);
  };

  return (
    <Button onClick={changePasswordHendler}>Change password</Button>
  )
};