import { useEffect, useRef, useState } from "react";
import useFetch from "./useFetch";

const useTasks = (state, setState, setLoading) => {
  const areaRef = useRef(null);
  const areaEditRef = useRef(null);

  const [newTask, setNewTask] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageTarget, setImageTarget] = useState(null);

  const [editedTaskId, setEditedTaskId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [imageEditTarget, setImageEditTarget] = useState(null);

  const {
    getItemFromBackEnd,
    sendItemToBackEnd,
    updateItemInBackEnd,
    deleteItemFromBackEnd,
    deleteTaskImageFromBackEnd
  } = useFetch(state, setState, setLoading);

  const inputNewTaskHandler = ({ target }) => {
    setNewTask(target.value);
  };

  //convert to base64encoded (string)
  const convertToBase64 = (targetFile, set) => {
    const reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onload = () => {
      set(reader.result)
    };
    reader.onerror = error => {
      alert("error in convertToBase64: ", error)
    };
  };

  const handleFileChange = (event) => {
    const targetFile = event.target.files[0]
    setFile(targetFile);
    setImageTarget(event.target)
    convertToBase64(targetFile, setImage)
  };

  const handleEditFileChange = (event) => {
    const targetFile = event.target.files[0]
    setEditFile(targetFile);
    setImageEditTarget(event.target)
    convertToBase64(targetFile, setEditImage)
  };

  const handleUpload = async (file, content, imageTarget, editedTaskId) => {
    setLoading(true)

    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('content', content);

    try {
      await (editedTaskId ?
        updateItemInBackEnd(formdata, editedTaskId) : sendItemToBackEnd(formdata));
      const res = await getItemFromBackEnd()
      setState(res.data)
      setLoading(false)
      if (imageTarget) imageTarget.value = null;
    } catch (err) {
      alert("error in handleUpload: ", err)
    }
  };

  const addNewTask = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") {
      setNewTask("");
      areaRef.current.focus();
      return
    }
    setLoading(true)
    handleUpload(file, newTask, imageTarget);
    setNewTask("");
    setFile(null);
    setImage(null);
    areaRef.current.focus();
  };

  const saveEditedTask = () => {
    if (editContent.trim() === "") {
      setEditContent("");
      areaEditRef.current.focus();
      return
    }
    handleUpload(editFile, editContent, imageEditTarget, editedTaskId);
    setEditedTaskId(null)
    setEditContent("");
    setEditFile(null);
    setEditImage(null);
    setImageEditTarget(null);
  };

  const deleteTask = async (id) => {
    setLoading(true)
    try {
      await deleteItemFromBackEnd(id);
      const res = await getItemFromBackEnd()
      setState(res.data)
      setLoading(false)
    } catch (err) {
      alert("error in deleteTask: ", err)
    }
  };

  const deleteImage = async (id) => {
    setLoading(true)
    try {
      await deleteTaskImageFromBackEnd(id)
      const res = await getItemFromBackEnd()
      setState(res.data)
      setLoading(false)
    } catch (err) {
      alert("error in deleteImage: ", err)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getItemFromBackEnd()
        setState(res.data)
        setLoading(false)
      } catch (err) {
        alert("error in fetchData: ", err)
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return {
    areaRef,
    areaEditRef,
    newTask,
    inputNewTaskHandler,
    addNewTask,
    deleteTask,
    handleFileChange,
    image,
    deleteImage,
    saveEditedTask,
    editedTaskId,
    editContent,
    editImage,
    setEditedTaskId,
    setEditContent,
    handleEditFileChange,
  };
};

export default useTasks;