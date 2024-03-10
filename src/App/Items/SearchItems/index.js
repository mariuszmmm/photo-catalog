import Button from "../../../common/Button"
import SearchContainer from "./styled";
import Input from "../../../common/Input"
import useSearchItem from "./useSearchItem";

const SearchItems = ({ state, setState }) => {
  const {
    filterValue,
    setFilterValueChange,
    filterHeandler,
    resetHeandler,
  } = useSearchItem(state, setState);

  return (
    <SearchContainer>
      <Input
        type="text"
        value={filterValue}
        onChange={setFilterValueChange}
      />
      <Button onClick={filterHeandler}>Szukaj</Button>
      <Button onClick={resetHeandler}>Reset</Button>
    </SearchContainer>
  )
};

export default SearchItems;