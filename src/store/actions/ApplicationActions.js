import axios from "axios";

export const addPayment = data => {
    return function(dispatch, getState) {
        let promise = new Promise(function(resolve, reject) {
            axios
                .post("/api/commitment", data)
                .then(response => {
                    dispatch({
                        type: "CREATE_PAYMENT_FULFILLED",
                        payload: response.data
                    });
                    resolve(response);
                })
                .catch(error => {
                    dispatch({
                        type: "CREATE_PAYMENT_REJECTED",
                        payload: error
                    });
                    reject(error);
                });
        });

        return promise;
    };
};

export const fetchPayments = () => {
    return function(dispatch) {
        axios
            .get("/api/commitment")
            .then(response => {
                dispatch({
                    type: "FETCH_PAYMENTS_FULFILLED",
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({ type: "FETCH_PAYMENTS_REJECTED", payload: error });
            });
    };
};
