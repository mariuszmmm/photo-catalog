import axios from "axios";
import { API_URL } from "./api";
import { jwtDecode } from "jwt-decode";
import { getSessionStorage, setSessionStorage } from "../sessionStorage";

const useFetch = () => {

  const logInToServer = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    const { token } = response.data;
    const decodedToken = token && jwtDecode(token);
    setSessionStorage("token", token);
    return {
      username: decodedToken && decodedToken.username,
      isAdmin: decodedToken && decodedToken.isAdmin,
    };
  };

  const getItemFromBackEnd = async () => {
    try {
      return await (axios.get(`${API_URL}/items`))
    } catch (err) {
      alert("error in getItemFromBackEnd: ")
    }
  };

  const sendItemToBackEnd = async (item) => {
    try {
      return await axios.post(`${API_URL}/items`, item)
    } catch (err) {
      alert("error in sendItemToBackEnd: ")
    }
  };

  const updateItemInBackEnd = async (item, id) => {
    try {
      return await axios.put(`${API_URL}/items/${id}`, item)
    } catch (err) {
      alert("error in updateItemInBackEnd: ")
    }
  };

  const deleteItemFromBackEnd = async (id) => {
    try {
      return await axios.delete(`${API_URL}/items/${id}`);
    } catch (err) {
      alert("error in deleteItemFromBackEnd: ")
    }
  };

  const deleteItemImageFromBackEnd = async (id) => {
    try {
      return await axios.put(`${API_URL}/items/${id}/removeImage`);
    } catch (err) {
      alert("errorr in deleteItemImageFromBackEnd: ")
    }
  };

  return {
    logInToServer,
    getItemFromBackEnd,
    sendItemToBackEnd,
    deleteItemFromBackEnd,
    deleteItemImageFromBackEnd,
    updateItemInBackEnd,
  }
};

export default useFetch;