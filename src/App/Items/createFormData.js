export const createFormData = (file, header, content) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('header', header);
  formData.append('content', content);
  return formData;
};