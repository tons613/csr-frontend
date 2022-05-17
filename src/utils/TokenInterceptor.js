import axios from "axios";
import store from "../redux/store";
import {
  setCurrentUser,
  removeCurrentUser,
} from "../redux/actions/authActions";
import api from "./config";

export default function setAuthorizationToken() {
  if (localStorage.token) {
    axios
      .get(api.API_URL + "/api/UserProfile", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((result) => store.dispatch(setCurrentUser(result.data)))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          store.dispatch(removeCurrentUser());
        }
      });
  } else {
    store.dispatch(removeCurrentUser());
  }

  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (
        !localStorage.token &&
        config.url !== api.API_URL + "/api/auth/login"
      ) {
        store.dispatch(removeCurrentUser());
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (response.status === 210) {
        store.dispatch({
          type: "STATUS_FETCHED",
          payload: 2,
        });
        return false;
      }

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      const originalRequest = error.config;
      // console.log(originalRequest);
      if (error.response && error.response.status === 401) {
        store.dispatch(removeCurrentUser());
      }

      return Promise.reject(error);
    }
  );
}
