import { useEffect } from "react";
import { useFetch } from "../../Fetch/useFetch";
import { fetchData } from "../fetchData";

const useExampleItems = (state, setState, setShowBackdrop) => {
  const { exampleItemsAPI, getItemAPI } = useFetch();

  const exampleItems = async (event) => {
    event.preventDefault();
    try {
      await exampleItemsAPI();
      setShowBackdrop(null)
      await fetchData(setState, getItemAPI);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    setTimeout(() => {
      if (state.items.length === 0 && state.user.isLoggedIn) setShowBackdrop("exampleItems");
    }, 3000)

    // eslint-disable-next-line
  }, []);

  return { exampleItems };
};

export default useExampleItems;