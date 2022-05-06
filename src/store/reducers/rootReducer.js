import authReducer from "./authReducer";
import sponsorsReducer from "./sponsorsReducer";
import { combineReducers } from "redux";
import PaymentReducer from "./PaymentReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    sponsors: sponsorsReducer,
    payments: PaymentReducer
});

export default rootReducer;
