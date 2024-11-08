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

    const filteredItems = state.items.map((item) => (
      {
        ...item,
        filteredOut: !(item.header.toUpperCase().includes(searchValue.trim().toUpperCase())),
      }
    ));
    setState(
      {
        ...state,
        items: filteredItems,
      }
    );
  };

  const onResetClick = () => {
    const resetItems = state.items.map((item) => ({ ...item, filteredOut: false }));
    setState(
      {
        ...state,
        items: resetItems,
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
  };
};

export default useSearchItem;