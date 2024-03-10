import { useEffect, useRef, useState } from "react";
import { useFetch } from "../Fetch/useFetch";

const useItems = (state, setState) => {
  const areaRef = useRef(null);
  const formRef = useRef(null);
  const areaEditRef = useRef(null);
  const [newItem, setNewItem] = useState(
    {
      content: "",
      file: null,
      image: null,
      targetImage: null
    }
  );

  const [editedItem, setEditedItem] = useState(
    {
      id: null,
      content: "",
      file: null,
      image: null,
      targetImage: null
    }
  );

  const {
    getItemAPI,
    sendItemAPI,
    updateItemAPI,
    deleteItemAPI,
    deleteItemImageAPI
  } = useFetch();

  const newItemContentChange = ({ target }) => {
    setNewItem({
      ...newItem,
      content: target.value,
    });
  };

  const editedItemContentChange = ({ target }) => {
    setEditedItem({
      ...editedItem,
      content: target.value,
    });
  };

  const createFormData = (file, content) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', content);
    return formData;
  }

  //convert to base64encoded (string)
  const convertToBase64 = (targetFile, item, set) => {
    const reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onload = () => {
      set((prevState) => (
        {
          ...prevState,
          image: reader.result,

        }
      ));
    };
    reader.onerror = error => {
      alert("error in convertToBase64: ", error)
    };
  };

  const newItemFileChange = (event) => {
    const targetFile = event.target.files[0];
    setNewItem(
      {
        ...newItem,
        file: targetFile,
        targetImage: event.target,
      }
    );
    convertToBase64(targetFile, newItem, setNewItem);
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
    convertToBase64(targetFile, editedItem, setEditedItem);
  };

  const handleAddNewItem = async () => {
    const formData = createFormData(newItem.file, newItem.content);
    try {
      const res = await sendItemAPI(formData)
      setState(
        {
          ...state,
          items: [...state.items, res.data],
          //    loading: false,
        }
      );
    } catch (err) {
      alert("error in handleAddNewItem: ")
    };
  };

  const handleSaveEditedItem = async () => {
    const formData = createFormData(editedItem.file, editedItem.content)
    try {
      const res = await updateItemAPI(formData, editedItem.id);
      const newItems = state.items.map((item) => (
        item._id !== res.data._id ? item : res.data
      ));
      setState(
        {
          ...state,
          items: newItems,
          //    loading: false,
        }
      );
      setEditedItem(
        {
          id: null,
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

  const addNewItem = (event) => {
    event.preventDefault();
    if (newItem.content.trim() === "") {
      setNewItem(
        {
          ...newItem,
          content: ""
        }
      );
      areaRef.current.focus();
      return
    }
    handleAddNewItem();
    setNewItem(
      {
        content: "",
        file: null,
        image: null,
      }
    )
    formRef.current.reset();
    areaRef.current.focus();
  };

  const saveEditedItem = () => {
    if (editedItem.content.trim() === "") {
      setEditedItem(
        {
          ...editedItem,
          conetnt: "",
        }
      );
      areaEditRef.current.focus();
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
          //    loading: false,
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
          //    loading: false,
        }
      );
    } catch (err) {
      alert("error in deleteImage: ")
    }
  };

  useEffect(() => {
    // setState((prevState) =>
    // ({
    //   ...prevState,
    //   loading: true,
    // }));
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
    areaRef,
    formRef,
    newItem,
    addNewItem,
    newItemContentChange,
    newItemFileChange,
    areaEditRef,
    editedItem,
    editedItemContentChange,
    editedItemFileChange,
    setEditedItem,
    deleteItem,
    deleteImage,
    saveEditedItem
  };
};

export default useItems;