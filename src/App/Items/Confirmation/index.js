import Button from "../../../common/Button";
import { Form } from "../../../common/Modal";
import { Backdrop } from "../../../common/Backdrop";
import ButtonsContainer from "../../../common/ButtonsContainer";


const Confirmation = ({ confirmation, setConfirmation }) => {
  const onConfirmationSubmit = (event) => {
    event.preventDefault();

    confirmation.calback(confirmation.id);
    setConfirmation({ state: null })
  };

  const onCancelClick = () => {
    setConfirmation({ state: null })
  };

  return (
    <Backdrop>
      <Form onSubmit={onConfirmationSubmit}>
        <h2>Napewno usunąć ?</h2>
        <ButtonsContainer>
          <Button type="submit">Tak</Button>
          <Button type="button" onClick={onCancelClick}>Nie</Button>
        </ButtonsContainer>
      </Form>
    </Backdrop>
  )
};

export default Confirmation;