import { useEffect, useRef, useState } from "react";
import { useFetch } from "../Fetch/useFetch";
import { convertToBase64 } from "./convertToBase64";
import { createFormData } from "./createFormData";

const useItems = (state, setState) => {
  const headerEditRef = useRef(null);
  const [editedItem, setEditedItem] = useState(
    {
      id: null,
      header: "",
      content: "",
      file: null,
      image: null,
      targetImage: null
    }
  );

  const {
    getItemAPI,
    updateItemAPI,
    deleteItemAPI,
    deleteItemImageAPI
  } = useFetch();

  const editedItemChange = ({ target }) => {
    const { name, value } = target;

    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const editedItemFileChange = (event) => {
    const targetFile = event.target.files[0]
    setEditedItem(
      {
        ...editedItem,
        file: targetFile,
        targetImage: event.target,
      }
    );
    convertToBase64(targetFile, setEditedItem);
  };

  const handleSaveEditedItem = async () => {
    const formData = createFormData(editedItem.file, editedItem.header, editedItem.content)
    try {
      const res = await updateItemAPI(formData, editedItem.id);
      const newItems = state.items.map((item) => (
        item._id !== res.data._id ? item : res.data
      ));
      setState(
        {
          ...state,
          items: newItems,
        }
      );
      setEditedItem(
        {
          id: null,
          header: "",
          content: "",
          file: null,
          image: null,
          targetImage: null
        }
      );
    } catch (err) {
      alert("error in handleSaveEditedItem: ")
    }
  };

  const saveEditedItem = () => {
    if (editedItem.header.trim() === "") {
      setEditedItem(
        {
          ...editedItem,
          header: "",
          conetnt: "",
        }
      );
      headerEditRef.current.focus();
      return
    }
    handleSaveEditedItem();
  };

  const deleteItem = async (id) => {
    try {
      await deleteItemAPI(id);
      const newItems = state.items.filter((item) => item._id !== id);
      setState(
        {
          ...state,
          items: newItems,
        }
      );
    } catch (err) {
      alert("error in deleteItem: ")
    }
  };

  const deleteImage = async (id) => {
    try {
      await deleteItemImageAPI(id)
      const newItems = state.items.map((item) => (
        item._id === id ? { ...item, image: null } : item));

      setState(
        {
          ...state,
          items: newItems,
        }
      );
    } catch (err) {
      alert("error in deleteImage: ")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setState((prevState) =>
        ({
          ...prevState,
          loading: false,
        }));
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [state.isLoggedIn]);

  return {
    headerEditRef,
    editedItem,
    editedItemChange,
    editedItemFileChange,
    setEditedItem,
    deleteItem,
    deleteImage,
    saveEditedItem
  };
};

export default useItems;