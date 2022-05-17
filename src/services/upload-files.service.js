import axios from "axios";
import api from "../utils/config";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(api.API_URL + "/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
  getFiles() {
    return axios.get("https://localhost:44382/");
  }
}
export default new UploadFilesService();
