import Button from "../../../common/Button";
import Form from "../../../common/Form";
import Modal from "../../../common/Modal"
import { Input } from "../styled";
import usePasswordChange from "./usePasswordChange"


const PasswordChange = ({ state, showPasswordChangeModal, setShowPasswordChangeModal }) => {

  const {
    password,
    newPassword,
    setInputChange,
    passwordChange,
  } = usePasswordChange(state, setShowPasswordChangeModal);

  return (
    <>
      <Button onClick={() => setShowPasswordChangeModal(true)}>Zmień hasło</Button>
      {showPasswordChangeModal &&
        <Modal>
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
            <Button type="button" onClick={() => setShowPasswordChangeModal(false)}>Anuluj</Button>
          </Form>
        </Modal>
      }
    </>
  )
};

export default PasswordChange;