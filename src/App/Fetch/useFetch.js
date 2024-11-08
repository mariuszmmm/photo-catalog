import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";

export const useFetch = () => {
  const getItemAPI = async () => {
    try {
      const response = await axios.get("/items");
      return response.data;
    } catch (err) {
      alert("error: Brak połączenia z serwerem.");
    }
  };

  const exampleItemsAPI = async () => {
    try {
      await (axios.get("/example"))
    } catch (err) {
      alert("error in exampleItemsAPI")
    }
  };

  const loginAPI = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      const { token, visitCount } = response.data;
      const decodedToken = token && jwtDecode(token);
      if (decodedToken) {
        setSessionStorage("token", token);

        return { decodedToken, visitCount }
      };
    } catch (error) {
      alert(error.response.data.message);
    };
  };

  const userAddAPI = async (username, password) => {
    try {
      const token = getSessionStorage("token")
      const response = await axios.post(
        "/user/add",
        { username, password },
        { headers: { Authorization: token } }
      );
      alert(response.data.message)

      return response;
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const passwordChangeAPI = async (username, password, newPassword) => {
    try {
      const token = getSessionStorage("token")
      const response = await axios.post(
        "/user/password",
        { username, password, newPassword },
        { headers: { Authorization: token } }
      );
      alert(response.data.message)

      return response
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  const sendItemAPI = async (jsonData) => {
    try {
      return await axios.post("/items/add", jsonData)
    } catch (err) {
      alert("error in sendItemAPI: ")
    }
  };

  const saveEditedItemAPI = async (jsonData) => {
    try {
      return await axios.put("/items/edit", jsonData)
    } catch (err) {
      alert("error in saveEditedItemAPI: ")
    }
  };

  const deleteItemAPI = async (jsonData) => {
    try {
      return await axios.delete("/items/delete", jsonData);
    } catch (err) {
      alert("error in deleteItemAPI: ")
    }
  };

  const deleteItemImageAPI = async (jsonData) => {
    try {
      return await axios.put("/items/deleteImage", jsonData);
    } catch (err) {
      alert("errorr in deleteItemImageAPI: ")
    }
  };

  const getFilesListAPI = async () => {
    try {
      const response = await (axios.get("/files"));
      return response.data;
    } catch (err) {
      alert("error in getFilesListAPI: ")
    }
  };

  const getUsersListAPI = async () => {
    try {
      const response = await (axios.get("/users"))
      const users = response.data.map((item) => item.username);
      return users;
    } catch (err) {
      alert("error in getUsersListAPI: ")
    }
  };

  return {
    loginAPI,
    userAddAPI,
    passwordChangeAPI,
    getItemAPI,
    exampleItemsAPI,
    sendItemAPI,
    deleteItemAPI,
    deleteItemImageAPI,
    saveEditedItemAPI,
    getFilesListAPI,
    getUsersListAPI,
  }
};