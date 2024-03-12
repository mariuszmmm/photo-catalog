import { useRef, useState } from "react";

const useFilterItem = (state, setState) => {
  const [filterValue, setFilterValue] = useState("");
  const inputRef = useRef();

  const setFilterValueChange = ({ target }) => {
    setFilterValue(target.value)
  };

  const filterHeandler = (event) => {
    event.preventDefault();

    if (filterValue.trim() === "") {
      setFilterValue("");
      inputRef.current.focus();
      return
    };

    const filteredItems = state.items.filter(item => item.header.toUpperCase().includes(filterValue.toUpperCase()))

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
    setFilterValue("");
  };

  return {
    inputRef,
    filterValue,
    setFilterValueChange,
    filterHeandler,
    resetHeandler,
  }
};

export default useFilterItem;