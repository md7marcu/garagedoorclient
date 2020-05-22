import {
    RETRIEVE_HOSTS,
    GET_GARAGE_STATE,
    GARAGE_DOOR_STATE,
    SETUP_GARAGE_LISTENERS,
    GARAGE_DISCONNECTED,
    GARAGE_CONNECTED,
    SET_GARAGE_SOCKET_TIMER,
} from "../constants/action-constants";
import appConstants from "../constants/app-constants";
import ToastType from "../constants/toastType";
import ToastFacade from "../facades/toastFacade";
import HubConnectionState from "../constants/hubConnectionState";

export const getGarageStateAction = store => next => action => {
    var state = store.getState();
    var hubConnection = state.signalRReducer.hubConnection;

    //TODO: Reconnect
    switch (action.type) {
        case GET_GARAGE_STATE:
            if (!state.zeroconfReducer.retrievingHosts && hostsNotInitialized(state)) {
                store.dispatch({ type: RETRIEVE_HOSTS });
            } else if (socketConnected(hubConnection)) {
                callServer(hubConnection);
            } else if (socketDisconnected(hubConnection)){
                reconnectSocket(store, hubConnection, state);
            }
            break;
        case SETUP_GARAGE_LISTENERS:
            if (
                action.door &&
                state.signalRReducer.garageIsConnecting &&
                socketConnecting(hubConnection)
            ) {
                // 4/9/2019 for whatever reason this is called 4 times
                hubConnection.onclose(() => {
                    console.log("SignalR disconnected from server");
                    ToastFacade.show("Garage disconnected.", ToastType.Danger);
                    store.dispatch({ type: GARAGE_DISCONNECTED });

                    // 4/9/2019 Not removing eventlisteners - don't know why onclose is called, shouldn't be.
                    // if (hasListener(hubConnection,`${action.door}${appConstants.SignalStatusTail}`.toLowerCase())) {
                    //     hubConnection.off(`${action.door}${appConstants.SignalStatusTail}`);
                    // }
                });

                // eslint-disable-next-line prettier/prettier
                if (!hasListener(hubConnection,`${action.door}${appConstants.SignalStatusTail}`.toLowerCase())) {
                    hubConnection.on(`${action.door}${appConstants.SignalStatusTail}`, position => {
                        store.dispatch({
                            type: GARAGE_DOOR_STATE,
                            door: action.door,
                            position: position,
                        });
                    });
                }
            }
            break;
        default:
            break;
    }
    next(action);
};

const hasListener = (hubConnection, endpoint) => {
    return hubConnection.methods[endpoint] && hubConnection.methods[endpoint].length > 0;
};

const callServer = hubConnection => {
    hubConnection
        .invoke(appConstants.GarageStateEndpoint)
        .then(() => console.log("Requested garagedoor status."))
        .catch(err => console.error(`callServer ${err}`));
};

const hostsNotInitialized = state => {
    return !state.zeroconfReducer.garageHost;
};

const reconnectSocket = (store, hubConnection, state) => {

    if (hubConnection && socketDisconnected(hubConnection)) {
        hubConnection
            .start()
            .then(() => {
                console.log("Connected to SignalR server.");
                ToastFacade.show("Connected to SignalR server.", ToastType.Success);
                callServer(hubConnection);
                store.dispatch({ type: SET_GARAGE_SOCKET_TIMER });

                return { type: GARAGE_CONNECTED };
            })
            .catch(err => {
                console.log(
                    "Reconnect Failed",
                    err == null ? err : "Unknown",
                    `Retrying in Msecs: ${state.signalRReducer.reconnectTime}, err: ${err}`
                );
                ToastFacade.show(
                    `Failed to reconnect to SignalR server. Reconnecting in ${
                        state.signalRReducer.reconnectTime
                    }`,
                    ToastType.Danger
                );
                setTimeout(() => {
                    reconnectSocket(store, hubConnection, state);
                }, state.signalRReducer.reconnectTime);
            });
    } else {
        state;
    }
};

const socketConnecting = hubConnection => {
    return (
        hubConnection &&
        hubConnection.connection &&
        hubConnection.connection.connectionState === HubConnectionState.Connecting
    );
};

const socketConnected = hubConnection => {
    return (
        hubConnection &&
        hubConnection.connection &&
        hubConnection.connection.connectionState === HubConnectionState.Connected
    );
};

const socketDisconnected = hubConnection => {
    return (
        hubConnection &&
        hubConnection.connection &&
        hubConnection.connection.connectionState === HubConnectionState.Disconnected
    );
};
