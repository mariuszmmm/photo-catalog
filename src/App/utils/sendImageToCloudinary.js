import axios from "axios";

export const sendImageToCloudinary = async (file) => {
  const cloudName = process.env.process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const formData = new FormData();
  formData.append('file', file);
  formData.append("upload_preset", "PhotoCatalog");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    const version = response.data.version;
    const imageId = response.data.public_id;
    const format = response.data.format;
    const url = response.data.url;
    const downloadUrl = `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/v${version}/${imageId}.${format}`;

    return { imageId, url, downloadUrl };
  } catch (err) {
    alert("error in sendImageToCloudinary: ", err)
    return null;
  };
};