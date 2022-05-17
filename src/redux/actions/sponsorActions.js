import axios from "axios";

export const createSponsor = sponser => {
    return function(dispatch, getState) {
        let promise = new Promise(function(resolve, reject) {
            axios
                .post("/api/sponsor", sponser)
                .then(response => {
                    dispatch({
                        type: "CREATE_SPONSORS_FULFILLED",
                        payload: response.data
                    });
                    resolve(response);
                })
                .catch(error => {
                    dispatch({
                        type: "CREATE_SPONSORS_REJECTED",
                        payload: error
                    });
                    reject(error);
                });
        });

        return promise;
    };
};

export const fetchSponsors = () => {
    return function(dispatch) {
        axios
            .get("/api/sponsor")
            .then(response => {
                dispatch({
                    type: "FETCH_SPONSORS_FULFILLED",
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({ type: "FETCH_SPONSORS_REJECTED", payload: error });
            });
    };
};

export function fetchUser(id) {
    return function(dispatch) {
        axios
            .get(baseUrl + "api/v1/users/" + id)
            .then(response => {
                dispatch({
                    type: "FETCH_USER_FULFILLED",
                    payload: response.data.user
                });
            })
            .catch(error => {
                dispatch({ type: "FETCH_USER_REJECTED", payload: error });
            });
    };
}
export function deleteUser(formData) {
    return function(dispatch) {
        axios
            .post(baseUrl + "api/v1/users/delete", formData)
            .then(response => {
                NotificationManager.success(
                    response.data.message,
                    "Success",
                    5000
                );
                dispatch(fetchUsers());
            })
            .catch(error => {
                NotificationManager.error(
                    "An error occured in the operation",
                    "Error",
                    5000
                );
            });
    };
}
