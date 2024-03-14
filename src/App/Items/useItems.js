import { useEffect, useRef, useState } from "react";
import { useFetch } from "../Fetch/useFetch";
import { convertToBase64 } from "../utils/convertToBase64";
import { createFormData } from "../utils/createFormData";

const useItems = (state, setState, confirmation, setConfirmation) => {
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
    saveEditedItemAPI,
    deleteItemAPI,
    deleteItemImageAPI
  } = useFetch();

  const onEditItemClick = (id, header, content) => {
    setEditedItem({
      ...editedItem, id, header, content
    });
  };

  const onEditedItemChange = ({ target }) => {
    const { name, value } = target;

    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const onEditedItemFileChange = (event) => {
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

  const saveEditedItem = async () => {
    const formData = createFormData(editedItem.file, editedItem.header, editedItem.content)
    try {
      const res = await saveEditedItemAPI(formData, editedItem.id);
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
      alert("error in saveEditedItem: ")
    }
  };

  const onSaveEditedItemClick = () => {
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
    saveEditedItem();
  };

  const onDeleteItemClick = async (id) => {
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
      alert("error in onDeleteItemClick: ")
    }
  };

  const onDeleteItemImageClick = async (id) => {
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
      alert("error in onDeleteItemImageClick: ")
    }
  };

  const confirm = (calback, id) => {
    if (confirmation.state === null) {
      setConfirmation({ state: false, calback, id });
    }
  };

  useEffect(() => {
    const id = editedItem.id;
    id && document.getElementById(id)
      .scrollIntoView({ behavior: 'smooth', block: "nearest" });
  }, [editedItem])

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
    onEditedItemChange,
    onEditedItemFileChange,
    onEditItemClick,
    onDeleteItemClick,
    onDeleteItemImageClick,
    onSaveEditedItemClick,
    confirm,
  };
};

export default useItems;