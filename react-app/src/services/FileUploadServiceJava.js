import http from "../http-java";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);
    console.log("files", file);
  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const uploadMul = (files) => {
    let formData = new FormData();
  
    formData.append("pic", files);
      console.log("files", files);
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  };

// const getFiles = () => {
//   return http.get("/files");
// };

const FileUploadService = {
  upload,
  uploadMul
//   getFiles,
};

export default FileUploadService; 