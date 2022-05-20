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
          reject(error);
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

export const SubmitForm = (data) => {
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