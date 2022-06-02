import axios from "axios";
import api from "../../utils/config";

export const PostContactDetail = (data) => {
  return function (dispatch, getState) {
    let promise = new Promise(function (resolve, reject) {
      axios
        .post(api.API_URL + "/api/contact_biodata", data, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          var err;
          if (error.response) {
            err = error.response.data;
          } else {
            err =
              "An error has occured. Please check your network connection and try again";
          }
          reject(err);
        });
    });

    return promise;
  };
};

export const PostInstitution = (data) => {
  return function (dispatch, getState) {
    let promise = new Promise(function (resolve, reject) {
      axios
        .post(api.API_URL + "/api/Institution", data, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };
};

export const PostTestCenter = (data) => {
  return function (dispatch, getState) {
    let promise = new Promise(function (resolve, reject) {
      axios
        .post(api.API_URL + "/api/CenterChoice", data, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };
};

export const SubmitForm = () => {
  return function (dispatch, getState) {
    let promise = new Promise(function (resolve, reject) {
      axios
        .post(
          api.API_URL + "/api/applicationcomplete",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };
};