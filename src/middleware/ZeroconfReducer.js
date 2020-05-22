import { GATE_HOST_FOUND, GARAGE_HOST_FOUND, RETRIEVE_HOSTS } from "../constants/action-constants";

const initialState = {
    gateHost: undefined,
    garageHost: undefined,
    retrievingHosts: false,
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case GATE_HOST_FOUND:
            if (state.garageHost) {
                hostsFound(state);
            }
            return {
                ...state,
                gateHost: action.gateHost,
            };
        case GARAGE_HOST_FOUND:
            if (state.gateHost) {
                hostsFound(state);
            }
            return {
                ...state,
                garageHost: action.garageHost,
            };
        case RETRIEVE_HOSTS:
            state.retrievingHosts = true;
            return state;
        default:
            return state;
    }
}

const hostsFound = state => {
    state.retrievingHosts = false;
};
