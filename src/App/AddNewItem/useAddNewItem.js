import { useRef, useState } from "react";
import { createFormData } from "../utils/createFormData";
import { useFetch } from "../Fetch/useFetch";
import { convertToBase64 } from "../utils/convertToBase64";

const useAddNewItem = (state, setState) => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const [newItem, setNewItem] = useState(
    {
      header: "",
      content: "",
      file: null,
      image: null,
      targetImage: null
    }
  );
  const { sendItemAPI } = useFetch();

  const onNewItemChange = ({ target }) => {
    const { name, value } = target;

    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const onNewItemFileChange = (event) => {
    const targetFile = event.target.files[0];
    setNewItem(
      {
        ...newItem,
        file: targetFile,
        targetImage: event.target,
      }
    );
    convertToBase64(targetFile, setNewItem);
  };

  const handleAddNewItem = async () => {
    const formData = createFormData(newItem.file, newItem.header, newItem.content);
    try {
      const res = await sendItemAPI(formData)
      setState(
        {
          ...state,
          items: [...state.items, res.data],
        }
      );
    } catch (err) {
      alert("error in handleAddNewItem: ")
    };
  };

  const onAddNewItemSubmit = (event) => {
    event.preventDefault();
    if (newItem.header.trim() === "") {
      setNewItem(
        {
          ...newItem,
          header: "",
        }
      );
      headerRef.current.focus();
      return
    }
    handleAddNewItem();
    setNewItem(
      {
        header: "",
        content: "",
        file: null,
        image: null,
      }
    )
    formRef.current.reset();
    headerRef.current.focus();
  };

  return {
    newItem,
    headerRef,
    formRef,
    onAddNewItemSubmit,
    onNewItemChange,
    onNewItemFileChange,
  }
};

export default useAddNewItem;