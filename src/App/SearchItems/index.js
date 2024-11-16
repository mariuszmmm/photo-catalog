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
    setSearchValue,
    onSearchSubmit,
    onResetClick,
  } = useSearchItems(state, setState);

  return (
    <Container>
      <InfoContainer>
        <Info>Wszystkich elementy: {state.items.length}  </Info>
        {state.search && <Info>Znalezione elementy: {state.filteredItems.length}</Info>}
      </InfoContainer>
      <SearchContainer onSubmit={onSearchSubmit}>
        <Input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
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