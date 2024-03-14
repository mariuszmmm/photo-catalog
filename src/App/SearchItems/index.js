import Button from "../../common/Button"
import SearchContainer from "./styled";
import Input from "../../common/Input"
import useSearchItems from "./useSearchItems";
import ButtonsContainer from "../../common/ButtonsContainer";

const SearchItems = ({ state, setState }) => {
  const {
    inputRef,
    searchValue,
    setSearchValueChange,
    onSearchSubmit,
    onResetClick,
  } = useSearchItems(state, setState);

  return (
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
  )
};

export default SearchItems;