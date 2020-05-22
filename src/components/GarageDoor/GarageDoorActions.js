import { GARAGE_MOVE, GET_GARAGE_STATE } from "../../constants/action-constants";
import ToastFacade from "../../facades/toastFacade";
import ToastType from "../../constants/toastType";

function moveDoor() {
    return {
        type: GARAGE_MOVE,
    };
}

export const moveAction = (click, door, host) => dispatch => {
    dispatch(moveDoor());

    return click(door, host)
        .then(
            response => {
                console.log(`Clicked door ${door}, response: ${response}`);
                dispatch({ type: GET_GARAGE_STATE });

                return response;
            },
            error => {
                let msg = "Error moving door";
                console.log("An error occurred when trying to move the door.", error);
                ToastFacade.show(msg, ToastType.Danger);

                return Promise.reject(msg);
            }
        )
        .catch(err => {
            console.log("moveAction Failed", err == null ? "Unknown" : err);
            let msg = "Exception trying to move garage door";
            ToastFacade.show(msg, ToastType.Danger);

            return Promise.reject(msg);
        });
};
