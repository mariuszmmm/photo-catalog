export const fetchData = async (setState, getItemAPI) => {
  try {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const items = await getItemAPI();
    if (items) {
      setState((prevState) =>
      ({
        ...prevState,
        items: [...items.data],
      }));
    };
  } catch (err) {
    alert("error in fetchData: ")
  } finally {
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }))
  };
};