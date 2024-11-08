import { useFetch } from "../../Fetch/useFetch";

export const useFilesList = (setFiles, setShowBackdrop) => {
  const { getFilesListAPI } = useFetch();

  const filesList = async () => {
    setShowBackdrop("filesList")
    const response = await getFilesListAPI();
    if (response) {
      setFiles({ ...response })
    };
  };

  return { filesList }
};