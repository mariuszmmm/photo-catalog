import Button from "../../../common/Button";
import { Container, Form } from "../../../common/Modal";
import { Backdrop } from "../../../common/Backdrop";
import useExampleItems from "./useExampleItems";
import { useState } from "react";
import { Loader } from "../../../common/Loader";

const ExampleItems = ({ state, setState, showBackdrop, setShowBackdrop }) => {
  const { exampleItems } = useExampleItems(state, setState, setShowBackdrop);
  const [copingImages, setCopingImages] = useState(false);

  return (
    <>
      {showBackdrop === "exampleItems" &&
        <Backdrop>
          <Form onSubmit={exampleItems}>
            <Loader loading={copingImages} />
            <h1>Katalog jest pusty.</h1>
            {copingImages ?
              <h3>Kopiowanie obrazów...</h3>
              :
              <h3>Załadować przykładowe elementy ?</h3>
            }
            <Container>
              <Button type="submit" hidden={copingImages} onClick={() => setCopingImages(true)}>Tak</Button>
              <Button type="button" hidden={copingImages} onClick={() => setShowBackdrop(null)}>Nie</Button>
            </Container>
          </Form>
        </Backdrop>
      }
    </>
  )
};

export default ExampleItems;