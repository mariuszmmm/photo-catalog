import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getSessionStorage, setSessionStorage } from "../utils/sessionStorage";

export const useFetch = () => {
  const getItemAPI = async () => {
    try {
      const response = await axios.get("/items");
      return response.data;
    } catch (err) {
      alert("Błąd: Brak połączenia z serwerem.");
      console.error("Error fetching items:", err);
    }
  };

  const exampleItemsAPI = async () => {
    try {
      await axios.get("/example")
    } catch (err) {
      alert("Błąd w exampleItemsAPI: Brak połączenia.");
      console.error("Error in exampleItemsAPI:", err);
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
      alert(`Błąd logowania: ${error.response.data.message}`);
      console.error("Login error:", error);
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
      alert(`Błąd przy dodawaniu użytkownika: ${error.response.data.message}`);
      console.error("Error adding user:", error);
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
      alert(`Błąd przy zmianie hasła: ${error.response.data.message}`);
      console.error("Error changing password:", error);
    }
  };

  const sendItemAPI = async (jsonData) => {
    try {
      return await axios.post("/items/add", jsonData)
    } catch (err) {
      alert("Błąd przy dodawaniu elementu.");
      console.error("Error adding item:", err);
    }
  };

  const saveEditedItemAPI = async (jsonData) => {
    try {
      return await axios.put("/items/edit", jsonData)
    } catch (err) {
      alert("Błąd przy zapisie edytowanego elementu.");
      console.error("Error itemSaving edited item:", err);
    }
  };

  const deleteItemAPI = async (jsonData) => {
    try {
      return await axios.delete("/items/delete", jsonData);
    } catch (err) {
      alert("Błąd przy usuwaniu elementu.");
      console.error("Error itemDeleting item:", err);
    }
  };

  const deleteItemImageAPI = async (jsonData) => {
    try {
      return await axios.put("/items/deleteImage", jsonData);
    } catch (err) {
      alert("Błąd przy usuwaniu obrazu elementu.");
      console.error("Error itemDeleting item image:", err);
    }
  };

  const getFilesListAPI = async () => {
    try {
      const response = await (axios.get("/files"));
      return response.data;
    } catch (err) {
      alert("Błąd przy pobieraniu listy plików.");
      console.error("Error fetching files list:", err);
    }
  };

  const getUsersListAPI = async () => {
    try {
      const response = await (axios.get("/users"))
      const users = response.data.map((item) => item.username);
      return users;
    } catch (err) {
      alert("Błąd przy pobieraniu listy użytkowników.");
      console.error("Error fetching users list:", err);
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