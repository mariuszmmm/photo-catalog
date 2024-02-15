import { useEffect, useRef, useState } from "react";
import { nanoid } from 'nanoid';
import useFetch from "./useFetch";

const useTasks = () => {
  const areaRef = useRef(null);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  const {
    getItemFromBackEnd,
    sendItemToBackEnd,
    deleteItemFromBackEnd,
  } = useFetch();

  const inputHandler = ({ target }) => {
    setNewTask(target.value);
  };

  const addNewTask = (event) => {
    event.preventDefault();

    const item = {
      id: nanoid(),
      content: newTask,
    };

    setState([...state, item]);
    sendItemToBackEnd(item);
    setNewTask("");
    areaRef.current.focus();
  };

  const deleteClick = (id) => {
    setState(state.filter(elem => elem.id !== id));
    deleteItemFromBackEnd(id);
  };

  useEffect(() => {
    getItemFromBackEnd(setState);

    const interval = setTimeout(() => {
      if (true) setLoading(false);
    }, 2000);

    return () => clearTimeout(interval);
  }, []);

  return {
    loading,
    areaRef,
    newTask,
    state,
    inputHandler,
    addNewTask,
    deleteClick
  };
};

export default useTasks;