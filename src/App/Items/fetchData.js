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
        items: [...items],
      }));
    };
  } catch (err) {
    alert("Błąd przy pobieraniu danych.");
    console.error("Error fetching data:", err);
  } finally {
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }))
  };
};