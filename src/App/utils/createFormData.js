export const createFormData = ({ file, image, header, content }) => {
  const formData = new FormData();
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  file && formData.append('file', file);
  file && formData.append("upload_preset", preset);
  image && formData.append('image', image);
  header && formData.append('header', header);
  content && formData.append('content', content);

  return formData;
};

