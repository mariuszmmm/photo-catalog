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
      console.error("Error fetching users list:", error);
      alert("Wystąpił błąd podczas pobierania listy użytkowników. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    };
  };

  return { usersList }
};