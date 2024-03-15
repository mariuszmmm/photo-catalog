import { useFetch } from "../../Fetch/useFetch";

export const useUsersList = (setUsers, setShowBackdrop) => {
  const { getUsersListAPI } = useFetch();

  const usersList = async () => {
    setShowBackdrop("usersList")
    const users = await getUsersListAPI();
    if (users) {
      setUsers([...users])
    };
  };

  return { usersList }
};