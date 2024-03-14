import Button from '../../../common/Button';
import { Backdrop, Form, Input } from '../../../common/Modal';
import { useUserAdd } from './useUserAdd';

const UserAdd = ({ showUserAddBackdrop, setShowUserAddBackdrop }) => {
  const {
    username,
    password,
    userAdd,
    setInputChange,
  } = useUserAdd(setShowUserAddBackdrop);

  return (
    <>
      <Button onClick={() => setShowUserAddBackdrop(true)}>Dodaj użytkownika</Button>
      {showUserAddBackdrop &&
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
            <Button type="button" onClick={() => setShowUserAddBackdrop(false)} >Anuluj</Button>
          </Form>
        </Backdrop>}
    </>
  );
};

export default UserAdd;
