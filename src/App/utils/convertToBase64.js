//convert to base64encoded (string)
export const convertToBase64 = (file, set) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
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