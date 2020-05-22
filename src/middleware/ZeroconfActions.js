import Zeroconf from "react-native-zeroconf";
import {
    RETRIEVE_HOSTS,
    SETUP_GATE_SOCKET,
    SETUP_GARAGE_SOCKET,
    SETUP_GARAGE_LISTENERS,
    GATE_HOST_FOUND,
    GARAGE_HOST_FOUND,
    SETUP_GATE_LISTENERS,
} from "../constants/action-constants";
import ToastFacade from "../facades/toastFacade";
import ToastType from "../constants/toastType";

export const retrieveHostsAction = store => next => action => {
    mDnsServiceFound = mDnsServiceFound.bind(this, store);
    var state = store.getState();

    if (action.type === RETRIEVE_HOSTS) {
        if (
            !state.settingsReducer.settingsHosts &&
            !state.zeroconfReducer.retrievingHosts &&
            hostsNotInitialized(state)
        ) {
            initZeroConf();
        }
    }
    next(action);
};

const initZeroConf = () => {
    let zeroconf = new Zeroconf();
    zeroconf.scan("kompisys");
    zeroconf.on("resolved", mDnsServiceFound);
    zeroconf.on("error", mDnsHostsNotResolved);

    return Promise.resolve();
};

function mDnsHostsNotResolved(store) {
    ToastFacade.show("Failed to find Garage/Gate", ToastType.Danger);

    if (!this.state.garageHost.isReady) {
        console.log(
            'Failed to setup the service using zeroconf:{name: "GaragePie", addresses: ["192.168.86.24"], port: 5000 } '
        );
        this.mDnsServiceFound({ name: "GaragePie", addresses: ["192.168.86.24"], port: 5000 });
    }
    if (!this.state.gateHost.isReady) {
        console.log(
            'Failed to setup the service using zeroconf:{name: "GatePie", addresses: ["192.168.86.100"], port: 3000 } '
        );
        this.mDnsServiceFound({ name: "GatePie", addresses: ["192.168.86.49"], port: 3000 });
    }
}

function mDnsServiceFound(store, service) {
    console.log(`foundmDNSService service: ${JSON.stringify(service)}`);

    if (service && service.name) {
        switch (service.name) {
            case "GatePie":
                var tmpHost = `http://${service.addresses[0]}:${service.port}`;
                store.dispatch({ type: GATE_HOST_FOUND, gateHost: tmpHost });
                store.dispatch({ type: SETUP_GATE_SOCKET, gateHost: tmpHost, isConnecting: true });
                // Ok - doesn't have to be connected for the listeners to be attached
                store.dispatch({ type: SETUP_GATE_LISTENERS });
                break;
            case "GaragePie":
                var tmpHost = `http://${service.addresses[0]}:${service.port}`;
                store.dispatch({ type: GARAGE_HOST_FOUND, garageHost: tmpHost });
                store.dispatch({ type: SETUP_GARAGE_SOCKET, garageHost: tmpHost });
                //TODO 12/7 - constants - settings loop
                store.dispatch({ type: SETUP_GARAGE_LISTENERS, door: "Left" });
                store.dispatch({ type: SETUP_GARAGE_LISTENERS, door: "Right" });
                break;
            default:
                break;
        }
    }
}

function hostsNotInitialized(state) {
    return !state.zeroconfReducer.gateHost && !state.zeroconfReducer.garageHost;
}
