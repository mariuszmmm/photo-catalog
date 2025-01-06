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
    console.error("Error in convertToBase64:", error);
    alert("Wystąpił błąd podczas konwersji pliku na base64.");
  };
};