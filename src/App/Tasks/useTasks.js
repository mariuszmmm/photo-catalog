import { useEffect, useRef, useState } from "react";
import useFetch from "./useFetch";

const useTasks = (state, setState) => {
  const areaRef = useRef(null);
  const areaEditRef = useRef(null);
  const [newTask, setNewTask] = useState(
    {
      content: "",
      file: null,
      image: null,
      targetImage: null
    }
  );

  const [editedTask, setEditedTask] = useState(
    {
      id: null,
      content: "",
      file: null,
      image: null,
      targetImage: null
    }
  );

  const {
    getItemFromBackEnd,
    sendItemToBackEnd,
    updateItemInBackEnd,
    deleteItemFromBackEnd,
    deleteTaskImageFromBackEnd
  } = useFetch();

  const inputNewTaskHandler = ({ target }) => {
    setNewTask({
      ...newTask,
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
  const convertToBase64 = (targetFile, task, set) => {
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

  const handleNewFileChange = (event) => {
    const targetFile = event.target.files[0];
    setNewTask(
      {
        ...newTask,
        file: targetFile,
        targetImage: event.target,
      }
    );
    convertToBase64(targetFile, newTask, setNewTask);
  };

  const handleEditFileChange = (event) => {
    const targetFile = event.target.files[0]
    setEditedTask(
      {
        ...editedTask,
        file: targetFile,
        targetImage: event.target,
      }
    );
    convertToBase64(targetFile, editedTask, setEditedTask);
  };

  const handleAddNewTask = async () => {
    const formData = createFormData(newTask.file, newTask.content);
    try {
      const res = await sendItemToBackEnd(formData)
      setState(
        {
          ...state,
          tasks: [...state.tasks, res.data],
          loading: false,
        }
      );
    } catch (err) {
      alert("error in handleAddNewTask: ")
    };
  };

  const handleSaveEditedTask = async () => {
    const formData = createFormData(editedTask.file, editedTask.content)
    try {
      const res = await updateItemInBackEnd(formData, editedTask.id);
      const newTasks = state.tasks.map((task) => (
        task._id !== res.data._id ? task : res.data
      ));
      setState(
        {
          ...state,
          tasks: newTasks,
          loading: false,
        }
      );
      setEditedTask(
        {
          id: null,
          content: "",
          file: null,
          image: null,
          targetImage: null
        }
      );
    } catch (err) {
      alert("error in handleSaveEditedTask: ")
    }
  };

  const addNewTask = (event) => {
    event.preventDefault();
    if (newTask.content.trim() === "") {
      setNewTask(
        {
          ...newTask,
          content: ""
        }
      );
      areaRef.current.focus();
      return
    }
    handleAddNewTask();
    setNewTask(
      {
        content: "",
        file: null,
        image: null,
      }
    )
    areaRef.current.focus();
  };

  const saveEditedTask = () => {
    if (editedTask.content.trim() === "") {
      setEditedTask(
        {
          ...editedTask,
          conetnt: "",
        }
      );
      areaEditRef.current.focus();
      return
    }
    handleSaveEditedTask();
  };

  const deleteTask = async (id) => {
    try {
      await deleteItemFromBackEnd(id);
      const newTasks = state.tasks.filter((task) => task._id !== id);
      setState(
        {
          ...state,
          tasks: newTasks,
          loading: false,
        }
      );
    } catch (err) {
      alert("error in deleteTask: ")
    }
  };

  const deleteImage = async (id) => {
    try {
      await deleteTaskImageFromBackEnd(id)
      const newTasks = state.tasks.map((task) => (
        task._id === id ? { ...task, image: null } : task));

      setState(
        {
          ...state,
          tasks: newTasks,
          loading: false,
        }
      );
    } catch (err) {
      alert("error in deleteImage: ")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getItemFromBackEnd()
        setState(
          {
            ...state,
            tasks: [...res.data],
            loading: false,
          }
        )
      } catch (err) {
        alert("error in fetchData: ")
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return {
    areaRef,
    areaEditRef,
    inputNewTaskHandler,
    addNewTask,
    deleteTask,
    handleNewFileChange,
    deleteImage,
    saveEditedTask,
    handleEditFileChange,

    newTask,
    setNewTask,
    editedTask,
    setEditedTask
  };
};

export default useTasks;