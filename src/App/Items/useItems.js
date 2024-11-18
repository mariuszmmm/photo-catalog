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

  const onEditedItemFileChange = (event, InputFileRef) => {
    const targetFile = event.target.files[0]
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"];
    if (!allowedMimeTypes.includes(targetFile.type)) {
      alert("Nieprawidłowy format pliku. Dozwolone formaty: JPEG, PNG, GIF, WebP, BMP.")
      InputFileRef.current.value = "";
      return
    }
    setEditedItem(
      {
        ...editedItem,
        file: targetFile,
        targetImage: event.target,
      }
    );
    convertToBase64(targetFile, setEditedItem);
  };

  const saveEditedItem = async (setItemSaving) => {
    setItemSaving(true);
    let response = null;
    if (editedItem.file) {
      try {
        await deleteItemImageAPI({ id: editedItem.id });
        response = await sendImageToCloudinary(editedItem.file);
      } catch (err) {
        console.error("Error itemDeleting or uploading image:", err);
        alert("Wystąpił błąd podczas obsługi obrazu.");
        return;
      }
    }
    const jsonData = {
      header: editedItem.header,
      content: editedItem.content,
      id: editedItem.id,
      ...(response && {
        image: response?.imageId || null,
        url: response?.url || null,
        downloadUrl: response?.downloadUrl || null,
      })
    };

    try {
      const res = await saveEditedItemAPI(jsonData);
      const newItems = state.items.map((item) => (
        item._id !== res.data._id ? item : res.data
      ));
      setState({ ...state, items: newItems });
      setEditedItem({ ...initState });
    } catch (err) {
      console.error("Error in saveEditedItem:", err);
      alert("Błąd podczas zapisywania zmienionego elementu.");
    } finally {
      setItemSaving(false);
    }
  };

  const onSaveEditedItemClick = (setItemSaving) => {
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
    saveEditedItem(setItemSaving);
  };

  const onCancelEditedItemClick = () => {
    setEditedItem({ ...initState })
  };

  const onDeleteItemClick = async (id, setStatus) => {
    setStatus(true);
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
      console.error("Error in onDeleteItemClick:", err);
      alert("Błąd podczas usuwania elementu.");
    } finally {
      setStatus(false);
    }
  };

  const onDeleteItemImageClick = async (id, setImageDeleting) => {
    setImageDeleting(true);
    try {
      await deleteItemImageAPI({ id })
      const newItems = state.items.map((item) => (
        item._id === id ? { ...item, image: null } : item));

      setState(
        {
          ...state,
          items: newItems,
        }
      );
    } catch (err) {
      console.error("Error in onDeleteItemImageClick:", err);
      alert("Błąd podczas usuwania obrazu elementu.");
    } finally {
      setImageDeleting(false);
    }
  };

  const confirm = (calback, id, setStatus) => {
    if (confirmation.state === false) {
      setConfirmation({ state: false, calback, id, setStatus });
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