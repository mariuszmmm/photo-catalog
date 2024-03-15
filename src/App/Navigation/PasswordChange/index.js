import Button from "../../../common/Button";
import { Backdrop, Form, Input } from "../../../common/Modal"
import usePasswordChange from "./usePasswordChange"

const PasswordChange = ({ state, showBackdrop, setShowBackdrop }) => {
  const {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  } = usePasswordChange(state, setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("passwordChange")}>Zmień hasło</Button>
      {showBackdrop === "passwordChange" &&
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
            <Button type="button" onClick={() => setShowBackdrop(null)}>Anuluj</Button>
          </Form>
        </Backdrop>
      }
    </>
  )
};

export default PasswordChange;