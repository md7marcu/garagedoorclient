import { GARAGE_MOVE, GATE_MOVE } from "../../constants/action-constants";

export default (state = {}, action) => {
    switch (action.type) {
        case GARAGE_MOVE:
            return {
                ...state,
                result: action.result,
            };
        case GATE_MOVE:
            return {
                ...state,
                result: action.result,
            };
        default:
            return state;
    }
};
