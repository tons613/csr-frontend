const iniState = {};

const sponsorsReducer = (state = iniState, action) => {
    switch (action.type) {
        case "CREATE_SPONSORS_FULFILLED":
            return state;

        case "CREATE_SPONSORS_REJECTED":
            // console.log("CREATE_SPONSORS_REJECTED");
            return { ...state, error: action.payload };

        case "FETCH_SPONSORS_FULFILLED":
            // console.log("FETCH_SPONSORS_FULFILLED", action.payload);
            return { ...state, sponsors: action.payload };

        default:
            return state;
    }
};

export default sponsorsReducer;
