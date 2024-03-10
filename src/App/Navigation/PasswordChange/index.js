import Button from "../../../common/Button";
import { Backdrop, Form, Input } from "../../../common/Modal"
import usePasswordChange from "./usePasswordChange"


const PasswordChange = ({ state, showPasswordChangeBackdrop, setShowPasswordChangeBackdrop }) => {
  const {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  } = usePasswordChange(state, setShowPasswordChangeBackdrop);

  return (
    <>
      <Button onClick={() => setShowPasswordChangeBackdrop(true)}>Zmień hasło</Button>
      {showPasswordChangeBackdrop &&
        <Backdrop>
          <Form onSubmit={passwordChange}>
            <div>
              <Input
                $hidden
                type="text"
                autoComplete="username"
              />
            </div>
            <div>
              <p>hasło:</p>
              <Input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                autoComplete="current-password"
                onChange={setInputChange}
              />
            </div>
            <div>
              <p>nowe hasło:</p>
              <Input
                type="password"
                placeholder="new password"
                name="newPassword"
                value={newPassword}
                autoComplete="new-password"
                onChange={setInputChange}
              />
            </div>
            <Button type="submit">Zapisz</Button>
            <Button type="button" onClick={() => setShowPasswordChangeBackdrop(false)}>Anuluj</Button>
          </Form>
        </Backdrop>
      }
    </>
  )
};

export default PasswordChange;