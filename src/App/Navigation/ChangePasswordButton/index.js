import Button from "../../../common/Button";

export const ChangePasswordButton = ({ setChangePasswordForm }) => {
  const changePasswordHendler = () => {
    setChangePasswordForm(true);
  };

  return (
    <Button onClick={changePasswordHendler}>Change password</Button>
  )
};