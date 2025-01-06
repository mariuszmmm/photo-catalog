import { useFetch } from "../../Fetch/useFetch";

export const useFilesList = (setFiles, setLoading, setShowBackdrop) => {
  const { getFilesListAPI } = useFetch();

  const getFilesList = async () => {
    setShowBackdrop("filesList")
    try {
      setLoading(true);
      const response = await getFilesListAPI();
      if (response) {
        setFiles({ ...response })
      };
    } catch (error) {
      console.error("Error fetching files list:", error);
      alert("Wystąpił błąd podczas próby pobrania listy plików. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    };
  };

  return { getFilesList }
};