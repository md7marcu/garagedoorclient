import {
    SETUP_GATE_SOCKET,
    GATE_CONNECTING,
    GATE_CONNECTED,
    GATE_DISCONNECTED,
} from "../constants/action-constants";
import SocketIOClient from "socket.io-client";

const initialState = {
    gateHost: undefined,
    socket: undefined,
    hasBeenDisconnected: false,
    isConnecting: false,
    config: undefined,
};

export default function socketIoReducer(state = initialState, action) {
    switch (action.type) {
        case GATE_CONNECTING:
            return {
                ...state,
                isConnecting: true,
            };
        //TODO Reduce by GateReducer ?
        case GATE_CONNECTED:
            return {
                ...state,
                isConnecting: false,
                hasBeenDisconnected: false,
            };
        //TODO Reduce by GateReducer ?
        case GATE_DISCONNECTED:
            return {
                ...state,
                hasBeenDisconnected: true,
                isConnecting: false,
            };
        case SETUP_GATE_SOCKET:
            if (action.gateHost) {
                var socket = state.socket;
                state.isConnecting =
                    action.isConnecting === undefined ? state.isConnecting : action.isConnecting;

                //TODO: To action ?
                if (
                    socket &&
                    state.hasBeenDisconnected &&
                    !action.isConnecting &&
                    socket.disconnected &&
                    !socket.connected
                ) {
                    socket.io.reconnect();
                } else if (socket === undefined) {
                    socket = SocketIOClient(action.gateHost, {
                        forceNew: true,
                        reconnection: true,
                        reconnectionDelay: 1000,
                        reconnectionDelayMax: 5000,
                        reconnectionAttempts: Infinity,
                    });
                }
            }
            return {
                ...state,
                socket: socket,
                gateHost: action.gateHost,
            };
        default:
            return state;
    }
}
