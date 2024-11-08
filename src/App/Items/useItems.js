import { useEffect, useRef, useState } from "react";
import { useFetch } from "../Fetch/useFetch";
import { convertToBase64 } from "../utils/convertToBase64";
import { fetchData } from "./fetchData"
import { sendImageToCloudinary } from "../utils/sendImageToCloudinary";

const useItems = (state, setState, confirmation, setConfirmation) => {
  const headerEditRef = useRef(null);
  const initState = {
    id: null,
    header: "",
    content: "",
    file: null,
    image: null,
    targetImage: null,
    url: null,
    downloadUrl: null,
  };
  const [editedItem, setEditedItem] = useState({ ...initState });
  const {
    getItemAPI,
    saveEditedItemAPI,
    deleteItemAPI,
    deleteItemImageAPI
  } = useFetch();

  const onEditItemClick = (id, header, content) => {
    setEditedItem({
      ...editedItem,
      id,
      header,
      content
    });
  };

  const onEditedItemChange = ({ target }) => {
    const { name, value } = target;

    setEditedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    let jsonData = {};
    if (editedItem.file) {
      await deleteItemImageAPI({ id: editedItem.id });

      const response = await sendImageToCloudinary(editedItem.file)

      jsonData = {
        image: response?.imageId || null,
        url: response?.url || null,
        downloadUrl: response?.downloadUrl || null,
        header: editedItem.header,
        content: editedItem.content,
        id: editedItem.id
      };
    } else {
      jsonData = {
        header: editedItem.header,
        content: editedItem.content,
        id: editedItem.id
      };
    }

    try {
      const res = await saveEditedItemAPI(jsonData);
      const newItems = state.items.map((item) => (
        item._id !== res.data._id ? item : res.data
      ));
      setState(
        {
          ...state,
          items: newItems,
        }
      );
      setEditedItem({ ...initState });
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

  const onCancelEditedItemClick = () => {
    setEditedItem({ ...initState })
  };

  const onDeleteItemClick = async (id) => {
    const jsonData = { data: { id } };
    try {
      await deleteItemAPI(jsonData);
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
    const jsonData = { id };
    try {
      await deleteItemImageAPI(jsonData)
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
    fetchData(setState, getItemAPI);

    // eslint-disable-next-line
  }, []);

  return {
    headerEditRef,
    editedItem,
    onEditedItemChange,
    onEditedItemFileChange,
    onEditItemClick,
    onDeleteItemClick,
    onDeleteItemImageClick,
    onSaveEditedItemClick,
    onCancelEditedItemClick,
    confirm,
  };
};

export default useItems;