import axios from "axios";
import { API_URL } from "../../features/api";

const useFetch = () => {

  const getItemFromBackEnd = async () => {
    try {
      return await (axios.get(`${API_URL}/tasks`))
    } catch (err) {
      alert("error in getItemFromBackEnd: ", err)
    }
  };

  const sendItemToBackEnd = async (item) => {
    try {
      return await axios.post(`${API_URL}/tasks`, item)
    } catch (err) {
      alert("error in sendItemToBackEnd: ", err)
    }
  };

  const updateItemInBackEnd = async (item, id) => {
    try {
      return await axios.put(`${API_URL}/tasks/${id}`, item)
    } catch (err) {
      alert("error in updateItemInBackEnd: ", err)
    }
  };

  const deleteItemFromBackEnd = async (id) => {
    try {
      return await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (err) {
      alert("error in deleteItemFromBackEnd: ", err)
    }
  };

  const deleteTaskImageFromBackEnd = async (id) => {
    try {
      return await axios.put(`${API_URL}/tasks/${id}/removeImage`);
    } catch (err) {
      alert("errorr in deleteTaskImageFromBackEnd: ", err)
    }
  };

  return {
    getItemFromBackEnd,
    sendItemToBackEnd,
    deleteItemFromBackEnd,
    deleteTaskImageFromBackEnd,
    updateItemInBackEnd,
  }
};

export default useFetch;