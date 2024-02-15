import { API_URL } from "./api";

const useFetch = () => {

  const getItemFromBackEnd = (updateState) => {
    fetch(`${API_URL}todos`)
      .then(res => res.json())
      .then(res => updateState(res.todoList));
  };

  const sendItemToBackEnd = (item) => {
    fetch(`${API_URL}todos`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json"
      },
    });
  };

  const deleteItemFromBackEnd = (id) => {
    fetch(`${API_URL}todos/${id}`, {
      method: "DELETE",
    });
  };

  return {
    getItemFromBackEnd,
    sendItemToBackEnd,
    deleteItemFromBackEnd,
  }
};

export default useFetch;