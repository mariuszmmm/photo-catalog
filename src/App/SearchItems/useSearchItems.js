import { useRef, useState } from "react";

const useSearchItem = (state, setState) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const onSearchSubmit = (event) => {
    event.preventDefault();

    if (searchValue.trim() === "") {
      setSearchValue("");
      inputRef.current.focus();
      return
    };

    const filteredItems = state.items.filter((item) => (
      item.header.toUpperCase().includes(searchValue.trim().toUpperCase())
      ||
      item.content.toUpperCase().includes(searchValue.trim().toUpperCase())
    ));
    setState(
      {
        ...state,
        search: true,
        filteredItems,
      }
    );
  };

  const onResetClick = () => {
    setState(
      {
        ...state,
        search: false,
        filteredItems: [],
      }
    );
    setSearchValue("");
  };

  return {
    inputRef,
    searchValue,
    setSearchValue,
    onSearchSubmit,
    onResetClick,
  };
};

export default useSearchItem;