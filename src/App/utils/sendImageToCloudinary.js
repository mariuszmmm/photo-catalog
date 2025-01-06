import axios from "axios";

export const sendImageToCloudinary = async (file) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const formData = new FormData();

  const maxFileSize = 5 * 1024 * 1024;
  if (file && file.size > maxFileSize) {
    alert("Plik jest zbyt duży. Maksymalny rozmiar to 5MB.");
    return null;
  };

  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"];
  if (!file || !allowedMimeTypes.includes(file.type)) {
    alert("Nieprawidłowy format pliku. Dozwolone formaty: JPEG, PNG, GIF, WebP, BMP.");
    return null;
  };

  file && formData.append('file', file);
  preset && formData.append("upload_preset", preset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    const { version, public_id: imageId, format, url } = response.data;
    const downloadUrl = `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/v${version}/${imageId}.${format}`;

    return { imageId, url, downloadUrl };
  } catch (err) {
    console.error("Error in sendImageToCloudinary:", err);
    alert("Wystąpił błąd podczas wysyłania pliku na Cloudinary. Spróbuj ponownie.");
    return null;
  };
};