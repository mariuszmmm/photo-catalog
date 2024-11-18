import Button from "../../../common/Button";
import { Form } from "../../../common/Modal";
import { Backdrop } from "../../../common/Backdrop";
import ButtonsContainer from "../../../common/ButtonsContainer";


const Confirmation = ({ query, confirmation, setConfirmation }) => {
  const onConfirmationSubmit = (event) => {
    event.preventDefault();

    confirmation.calback(confirmation.id, confirmation.setStatus);
    setConfirmation({ state: false })
  };

  const onCancelClick = () => {
    setConfirmation({ state: false })
  };

  return (
    <Backdrop>
      <Form onSubmit={onConfirmationSubmit}>
        <h2>{query}</h2>
        <br />
        <ButtonsContainer>
          <Button type="submit">Tak</Button>
          <Button type="button" onClick={onCancelClick}>Nie</Button>
        </ButtonsContainer>
      </Form>
    </Backdrop>
  )
};

export default Confirmation;