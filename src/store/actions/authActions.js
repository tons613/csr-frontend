import axios from "axios";
// import setAuthorizationToken from "../../utils/TokenInterceptor";
// import jwt from "jsonwebtoken";
import api from "../../utils/config";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    dispatch({ type: "AUTH_LOADING", loading: true });

    dispatch(setCurrentUser(credentials));
    console.log(credentials);
    // axios
    //   .post(api.API_URL + "/api/auth/login", credentials)
    //   .then((user) => {
    //     const token = user.data.access_token;
    //     handleToken(token);
    //     dispatch(setCurrentUser(user.data.profile));
    //   })
    //   .catch((error) => {
    //     // alert(JSON.stringify(error.response.status));

    //     var err;
    //     var code;
    //     if (error.response) {
    //       err = error.response.data.error;
    //       code = error.response.status;
    //     } else {
    //       err =
    //         "Login Failed. Please check your network connection, and try again";
    //       code = 500;
    //     }

    //     dispatch({ type: "LOGIN_ERROR", err, code });
    //   });
  };
};

const handleToken = (token) => {
  localStorage.setItem("token", token);
  // setAuthorizationToken();
  // console.log(jwt.decode(token));
};

export const setCurrentUser = (user) => {
  //alert(JSON.stringify(user))
  // var uid = jwt.decode(token).sub;
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const setActivationRequest = (data) => {
  return {
    type: "ACTIVATE_ACCOUNT_PH_DATA",
    payload: data,
  };
};

export const removeCurrentUser = () => {
  localStorage.removeItem("token");
  return { type: "LOGOUT_SUCCESS" };
};

export const signOut = () => {
  return (dispatch, getState) => {
    // axios.post("/auth/logout").then(() => {
    dispatch(removeCurrentUser());
    // });
  };
};

export const signUp = (newUser) => {
  // alert(JSON.stringify(newUser));

  return (dispatch, getState) => {
    dispatch({ type: "AUTH_LOADING", loading: true });
    const promise = new Promise(function (resolve, reject) {
      axios
        .post(api.API_URL + "/api/auth/register", newUser)
        .then((user) => {
          dispatch({ type: "SIGNUP_SUCCESS" });
          // const token = user.data.access_token;
          // console.log(token);
          // handleToken(token);
          // axios
          //   .get(api.API_URL + "/profile", {
          //     headers: {
          //       Authorization: "Bearer " + token,
          //     },
          //   })
          //   .then((result) => dispatch(setCurrentUser(result.data)));
          resolve();
        })
        .catch((error) => {
          // alert(JSON.stringify(error));
          var err;
          if (error.response) {
            err = error.response.data.error;
            // alert(JSON.stringify(err));
          } else {
            err =
              "Registration Failed. Please check your network connection and try again";
          }

          dispatch({ type: "SIGNUP_ERROR", err });
          reject();
        });
    });

    return promise;
  };
};
