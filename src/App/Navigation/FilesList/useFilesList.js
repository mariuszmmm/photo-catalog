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
      console.error(error);
    } finally {
      setLoading(false);
    };
  };

  return { getFilesList }
};