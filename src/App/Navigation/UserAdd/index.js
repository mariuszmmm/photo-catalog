import Button from '../../../common/Button';
import { Backdrop, Form, Input } from '../../../common/Modal';
import { useUserAdd } from './useUserAdd';

const UserAdd = ({ showBackdrop, setShowBackdrop }) => {
  const {
    username,
    password,
    userAdd,
    setInputChange,
  } = useUserAdd(setShowBackdrop);

  return (
    <>
      <Button onClick={() => setShowBackdrop("userAdd")}>Dodaj użytkownika</Button>
      {showBackdrop === "userAdd" &&
        <Backdrop>
          <Form onSubmit={userAdd}>
            <div>
              <p>login:</p>
              <Input
                type="text"
                placeholder="username"
                name="username"
                value={username}
                autoComplete="username"
                onChange={setInputChange}
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
            <Button type="submit" >Zapisz</Button>
            <Button type="button" onClick={() => setShowBackdrop(null)} >Anuluj</Button>
          </Form>
        </Backdrop>}
    </>
  );
};

export default UserAdd;
