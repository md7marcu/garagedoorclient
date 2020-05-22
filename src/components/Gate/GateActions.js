import { GET_GATE_STATE, GATE_MOVE } from "../../constants/action-constants";
import ToastFacade from "../../facades/toastFacade";
import ToastType from "../../constants/toastType";

function moveGate() {
    return {
        type: GATE_MOVE,
    };
}

export const moveAction = (click, host) => dispatch => {
    dispatch(moveGate());

    return click(host)
        .then(
            response => {
                console.log(`Clicked gate on host ${host}, response: ${JSON.stringify(response)}`);
                dispatch({ type: GET_GATE_STATE });

                return response;
            },
            error => {
                let msg = "Error moving gate";
                console.log(msg, error);
                ToastFacade.show(msg, ToastType.Danger);

                return Promise.reject(msg);
            }
        )
        .catch(error => {
            console.log("moveAction (gate) failed", error == null ? "Unknown" : error);
            let msg = "Exception trying to move gate";
            ToastFacade.show(msg, ToastType.Danger);

            return Promise.reject(msg);
        });
};
