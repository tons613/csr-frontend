import axios from "axios";
import api from "../utils/config";

class UploadFilesService {
  upload(file, docType, onUploadProgress) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("DocumentName", docType);

    return axios.post(api.API_URL + "/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.token,
      },
      onUploadProgress,
    });
  }
  getFiles(docType) {
    return axios.get(api.API_URL + "/api/get_file_upload?doc=" + docType, {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    });
  }

  deleteFile(docId) {
    return axios.delete(api.API_URL + "/api/delete_file/" + docId, {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    });
  }
}


export default new UploadFilesService();
