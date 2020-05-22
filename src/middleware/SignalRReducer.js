import {
    SETUP_GARAGE_SOCKET,
    SET_GARAGE_SOCKET_TIMER,
    GARAGE_CONNECTING,
    GARAGE_CONNECTED,
    GARAGE_DISCONNECTED,
} from "../constants/action-constants";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import appConstants from "../constants/app-constants";
import ToastType from "../constants/toastType";
import ToastFacade from "../facades/toastFacade";

const initialState = {
    hubConnection: undefined,
    garageHost: undefined,
    reconnectTime: appConstants.OneSecond,
    garageIsConnecting: false,
};

export default function signalRReducer(state = initialState, action) {
    switch (action.type) {
        case GARAGE_CONNECTING:
            return {
                ...state,
                garageIsConnecting: true,
            };
        case GARAGE_CONNECTED:
            return {
                ...state,
                garageIsConnecting: false,
            };
        case GARAGE_DISCONNECTED:
            return {
                ...state,
                garageIsConnecting: false,
            };
        case SETUP_GARAGE_SOCKET:
            if (action.garageHost) {
                var hubConnection = state.hubConnection;

                //TODO: To action ?
                if (hubConnection === undefined && !state.garageIsConnecting) {
                    state.garageIsConnecting = true;
                    var hubConnection = new HubConnectionBuilder()
                        .configureLogging(LogLevel.Trace)
                        .withUrl(`${action.garageHost}/${appConstants.HubSuffix}`)
                        .build();

                    hubConnection
                        .start()
                        .then(resp => {
                            console.log("SETUP_GARAGE_SOCKET: Connected to SignalR server.");
                            ToastFacade.show("Connected to Garage.", ToastType.Success);
                            state.garageIsConnecting = false;

                            return resp;
                        })
                        .catch(err => {
                            console.log(
                                `SETUP_GARAGE_SOCKET: Failed to connect to SignalR server. ${err}`
                            );
                            ToastFacade.show("Error with Garage connection.", ToastType.Danger);
                        });
                }
            }
            return {
                ...state,
                hubConnection: hubConnection,
            };
        case SET_GARAGE_SOCKET_TIMER:
            return {
                ...state,
                reconnectTime: Math.min(appConstants.OneSecond * 5, state.reconnectTime * 2),
            };
        default:
            return state;
    }
}
