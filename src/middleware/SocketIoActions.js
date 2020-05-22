import {
    RETRIEVE_HOSTS,
    GET_GATE_STATE,
    SETUP_GATE_LISTENERS,
    GATE_DISCONNECTED,
    GATE_CONNECTED,
    GATE_OPEN_EVENT,
    GATE_CLOSED_EVENT,
    GATE_MOVING_EVENT,
    GATE_ERROR_EVENT,
} from "../constants/action-constants";
import appConstants from "../constants/app-constants";
import ToastFacade from "../facades/toastFacade";
import { GateState } from "../constants/gateState";
import ToastType from "../constants/toastType";

export const getGateStateAction = store => next => action => {
    var state = store.getState();
    var socket = state.socketIoReducer.socket;

    switch (action.type) {
        case GET_GATE_STATE:
            if (!state.zeroconfReducer.retrievingHosts && hostsNotInitialized(state)) {
                store.dispatch({ type: RETRIEVE_HOSTS });
            } else if (socket && socket.connected) {
                socket.emit(appConstants.GateStateEndpoint);
            }
            break;
        case SETUP_GATE_LISTENERS:
            if (state.socketIoReducer.isConnecting) {
                socket.on("disconnect", () => {
                    console.log("Disconnected from Gate server.");
                    ToastFacade.show("Gate disconnected.", ToastType.Danger);
                    store.dispatch({ type: GATE_DISCONNECTED });
                    // TODO: server disconnect - what about client disconnect?
                    if (socket.hasListeners(appConstants.GateStateBus)) {
                        socket.removeListener(`${appConstants.GateStateBus}`, data => {
                            getGateConfigs(store, data);
                        });
                    }
                });
                socket.on("connect", () => {
                    console.log("Connected to Gate server.");
                    ToastFacade.show("Connected to Gate.", ToastType.Success);
                    store.dispatch({ type: GATE_CONNECTED });
                    store.dispatch({ type: GET_GATE_STATE });

                    if (!socket.hasListeners(appConstants.GateStateBus)) {
                        socket.on(appConstants.GateStateBus, data => {
                            getGateConfigs(store, data);
                        });
                    }
                });
            }
            break;
    }
    next(action);
};

function hostsNotInitialized(state) {
    return !state.zeroconfReducer.gateHost;
}

const getGateConfigs = (store, data) => {
    switch (data) {
        case GateState.Open:
            store.dispatch({ type: GATE_OPEN_EVENT });
            break;
        case GateState.Closed:
            store.dispatch({ type: GATE_CLOSED_EVENT });
            break;
        case GateState.Moving:
            store.dispatch({ type: GATE_MOVING_EVENT });
            break;
        case GateState.Error:
        default:
            store.dispatch({ type: GATE_ERROR_EVENT });
    }
};
