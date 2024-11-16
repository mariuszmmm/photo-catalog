import { useFetch } from "../../Fetch/useFetch";

export const useUsersList = (setUsers, setLoading, setShowBackdrop) => {
  const { getUsersListAPI } = useFetch();

  const usersList = async () => {
    setShowBackdrop("usersList")
    try {
      setLoading(true);
      const users = await getUsersListAPI();
      if (users) {
        setUsers([...users])
      };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    };
  };

  return { usersList }
};