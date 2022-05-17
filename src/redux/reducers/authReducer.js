import isEmpty from "lodash/isEmpty";

const iniState = {
  isAuthenticated: false,
  currentUser: {},
  loading: true,
};

const authReducer = (state = iniState, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        loading: action.loading,
        authError: null,
        authErrorCode: null,
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        authError: null,
        loading: false,
      };
    case "STATUS_FETCHED":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          status_code: action.payload,
        },
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: action.err,
        authErrorCode: action.code,
        loading: false,
      };

    case "LOGOUT_SUCCESS":
      // console.log("LOGOUT_SUCCESS");
      return {
        ...state,
        currentUser: {},
        isAuthenticated: false,
        loading: false,
      };

    case "SIGNUP_SUCCESS":
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        authError: null,
        loading: false,
        signupSuccess: true,
      };

    case "SIGNUP_ERROR":
      console.log("SIGNUP_ERROR");
      return {
        ...state,
        authError: action.err,
        loading: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        authError: null,
        authErrorCode: null,
        signupSuccess: false,
      };

    default:
      return state;
  }
};

export default authReducer;
