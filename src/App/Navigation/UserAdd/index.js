import React from 'react';
import Form from '../../../common/Form';
import { Input } from '../styled';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import { useUserAdd } from './useUserAdd';

const UserAdd = ({ showUserAddModal, setShowUserAddModal }) => {
  const {
    username,
    password,
    userAdd,
    setInputChange,
  } = useUserAdd(setShowUserAddModal);

  return (
    <>
      <Button onClick={() => setShowUserAddModal(true)}>Dodaj użytkownika</Button>
      {showUserAddModal &&
        <Modal>
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
            <Button type="button" onClick={() => setShowUserAddModal(false)} >Anuluj</Button>
          </Form>
        </Modal>}
    </>
  );
};

export default UserAdd;
