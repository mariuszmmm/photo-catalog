import { useRef, useState } from "react";

const useSearchItem = (state, setState) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const setSearchValueChange = ({ target }) => {
    setSearchValue(target.value)
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();

    if (searchValue.trim() === "") {
      setSearchValue("");
      inputRef.current.focus();
      return
    };

    const filteredItems = state.items.filter(item => item.header.toUpperCase().includes(searchValue.toUpperCase()))

    setState(
      {
        ...state,
        filter: true,
        filteredItems: [...filteredItems]
      }
    );
  };

  const onResetClick = () => {
    setState(
      {
        ...state,
        filter: false,
        filteredItems: []
      }
    );
    setSearchValue("");
  };

  return {
    inputRef,
    searchValue,
    setSearchValueChange,
    onSearchSubmit,
    onResetClick,
  }
};

export default useSearchItem;