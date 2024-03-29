import Button from "../../../common/Button";
import { Form } from "../../../common/Modal";
import { Backdrop } from "../../../common/Backdrop";
import useExampleItems from "./useExampleItems";

const ExampleItems = ({ state, setState, showBackdrop, setShowBackdrop }) => {
  const { exampleItems } = useExampleItems(state, setState, setShowBackdrop);

  return (
    <>
      {showBackdrop === "exampleItems" &&
        <Backdrop>
          <Form onSubmit={exampleItems}>
            <h2>Katalog jest pusty. <br /> Załadować przykładowe elementy ?</h2>
            <Button type="submit">Tak</Button>
            <Button type="button" onClick={() => setShowBackdrop(null)}>Nie</Button>
          </Form>
        </Backdrop>
      }
    </>
  )
};

export default ExampleItems;