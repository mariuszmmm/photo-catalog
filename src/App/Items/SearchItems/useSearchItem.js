import { useState } from "react";

const useSearchItem = (state, setState) => {
  const [filterValue, setFilterValue] = useState("");

  const setFilterValueChange = ({ target }) => {
    setFilterValue(target.value)
  };

  const filterHeandler = () => {
    const filteredItems = state.items.filter(item => item.header.includes(filterValue))

    setState(
      {
        ...state,
        filter: true,
        filteredItems: [...filteredItems]
      }
    );
  };

  const resetHeandler = () => {
    setState(
      {
        ...state,
        filter: false,
        filteredItems: []
      }
    );
  };

  return {
    filterValue,
    setFilterValueChange,
    filterHeandler,
    resetHeandler,
  }
};

export default useSearchItem;