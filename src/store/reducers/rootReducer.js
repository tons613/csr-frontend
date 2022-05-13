import authReducer from "./authReducer";
import sponsorsReducer from "./sponsorsReducer";
import { combineReducers } from "redux";
import ApplicantReducer from "./ApplicationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  sponsors: sponsorsReducer,
  applicant: ApplicantReducer,
});

export default rootReducer;
