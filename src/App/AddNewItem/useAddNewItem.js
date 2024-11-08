import { useRef, useState } from "react";
import { useFetch } from "../Fetch/useFetch";
import { convertToBase64 } from "../utils/convertToBase64";
import { sendImageToCloudinary } from "../utils/sendImageToCloudinary";

const useAddNewItem = (state, setState) => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const [newItem, setNewItem] = useState(
    {
      header: "",
      content: "",
      file: null,
      image: null,
      targetImage: null,
      url: null,
      downloadUrl: null,
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
    const file = event.target.files[0];
    setNewItem(
      {
        ...newItem,
        file,
        targetImage: event.target,
      }
    );
    convertToBase64(file, setNewItem);
  };

  const handleAddNewItem = async () => {
    try {
      let jsonData = {};
      if (newItem.file) {
        const { imageId, url, downloadUrl } = await sendImageToCloudinary(newItem.file)
        jsonData = {
          header: newItem.header,
          content: newItem.content,
          image: imageId,
          url,
          downloadUrl,
        };
      } else {
        jsonData = {
          header: newItem.header,
          content: newItem.content,
        };
      };

      const res = await sendItemAPI(jsonData);
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
        url: null,
        downloadUrl: null,
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