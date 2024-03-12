import Button from "../../../common/Button"
import FilterContainer from "./styled";
import Input from "../../../common/Input"
import useFilterItems from "./useFilterItems";
import ButtonsContainer from "../../../common/ButtonsContainer";

const FilterItems = ({ state, setState }) => {
  const {
    inputRef,
    filterValue,
    setFilterValueChange,
    filterHeandler,
    resetHeandler,
  } = useFilterItems(state, setState);

  return (
    <FilterContainer onSubmit={filterHeandler}>
      <ButtonsContainer>
        <Input
          ref={inputRef}
          type="text"
          value={filterValue}
          onChange={setFilterValueChange}
        />
      </ButtonsContainer>
      <ButtonsContainer>
        <Button type="submit">Szukaj</Button>
        <Button type="button" onClick={resetHeandler}>Reset</Button>
      </ButtonsContainer>
    </FilterContainer>
  )
};

export default FilterItems;