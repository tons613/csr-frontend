const iniState = {};

const PaymentReducer = (state = iniState, action) => {
    switch (action.type) {
        case "CREATE_PAYMENT_FULFILLED":
            return state;

        case "ACTIVATE_ACCOUNT_PH_DATA":
            return {...state, activate_ph_detail: action.payload };

        case "CREATE_PAYMENT_REJECTED":
            // console.log("CREATE_SPONSORS_REJECTED");
            return { ...state, error: action.payload };

        case "FETCH_PAYMENTS_FULFILLED":
            // console.log("FETCH_SPONSORS_FULFILLED", action.payload);
            return { ...state, payment: action.payload };

        default:
            return state;
    }
};

export default PaymentReducer;
