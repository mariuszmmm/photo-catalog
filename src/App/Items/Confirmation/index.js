import Button from "../../../common/Button";
import ButtonsContainer from "../../../common/ButtonsContainer";
import { Backdrop, Form } from "../../../common/Modal";

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
      <ButtonsContainer>
        <Form onSubmit={onConfirmationSubmit}>
          <h2>Napewno usunąć ?</h2>
          <Button type="submit">Tak</Button>
          <Button type="button" onClick={onCancelClick}>Anuluj</Button>
        </Form>
      </ButtonsContainer>
    </Backdrop>
  )
};

export default Confirmation;