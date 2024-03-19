import Button from "../../common/Button"
import { SearchContainer, Container } from "./styled";
import Input from "../../common/Input"
import useSearchItems from "./useSearchItems";
import ButtonsContainer from "../../common/ButtonsContainer";
import { Info } from "../Navigation/styled";
import InfoContainer from "../../common/InfoContainer";

const SearchItems = ({ state, setState }) => {
  const {
    inputRef,
    searchValue,
    setSearchValueChange,
    onSearchSubmit,
    onResetClick,
  } = useSearchItems(state, setState);

  return (
    <Container>
      <InfoContainer>
        <Info>Ilość elementów: {state.items.length}</Info>
      </InfoContainer>
      <SearchContainer onSubmit={onSearchSubmit}>
        <Input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={setSearchValueChange}
        />
        <ButtonsContainer>
          <Button type="submit">Szukaj</Button>
          <Button type="button" onClick={onResetClick}>Reset</Button>
        </ButtonsContainer>
      </SearchContainer>
    </Container>
  )
};

export default SearchItems;