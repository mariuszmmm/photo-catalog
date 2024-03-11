import Button from "../../../common/Button"
import FilterContainer from "./styled";
import Input from "../../../common/Input"
import useFilterItems from "./useFilterItems";
import ButtonsContainer from "../../../common/ButtonsContainer";

const FilterItems = ({ state, setState }) => {
  const {
    filterValue,
    setFilterValueChange,
    filterHeandler,
    resetHeandler,
  } = useFilterItems(state, setState);

  return (
    <FilterContainer>
      <ButtonsContainer>
        <Input
          type="text"
          value={filterValue}
          onChange={setFilterValueChange}
        />
      </ButtonsContainer>
      <ButtonsContainer>
        <Button onClick={filterHeandler}>Szukaj</Button>
        <Button onClick={resetHeandler}>Reset</Button>
      </ButtonsContainer>
    </FilterContainer>
  )
};

export default FilterItems;