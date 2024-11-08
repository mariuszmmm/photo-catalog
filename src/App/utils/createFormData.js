export const createFormData = ({ file, image, header, content }) => {
  const formData = new FormData();
  file && formData.append('file', file);
  file && formData.append("upload_preset", "PhotoCatalog");
  image && formData.append('image', image);
  header && formData.append('header', header);
  content && formData.append('content', content);

  return formData;
};

