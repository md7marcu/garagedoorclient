import React, { Component } from "react";
import { AppState } from "react-native";
import {
    GET_GATE_STATE,
    GET_GARAGE_STATE,
    RETRIEVE_HOSTS,
    SETTINGS_NOT_READY,
} from "../../constants/action-constants";
import { connect } from "react-redux";
import { moveDoorAction, moveGateAction } from "./HomeAction";
import { initializeSettings } from "../Settings/SettingsActions";

import HomeScreen from "./HomeScreen";

class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appState: AppState.currentState,
        };

        this.garageDoorPress = this.garageDoorPress.bind(this);
        this.gatePress = this.gatePress.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    // componentDidUpdate = () => {
    //     if (
    //         !this.props.retrievingHosts &&
    //         !(this.props.garageHostReady && this.props.gateHostReady) &&
    //         !this.props.settingsReady &&
    //         !this.props.settingsLoading
    //     ) {
    //         this.props.initialize();
    //     }
    // };

    componentDidMount = () => {
        AppState.addEventListener("change", this.handleAppStateChange);

        if (
            !this.props.retrievingHosts &&
            !this.props.settingsReady &&
            !this.props.settingsLoading
        ) {
            this.props.initialize();
        }
    };

    componentWillUnmount = () => {
        AppState.removeEventListener("change", this.handleAppStateChange);
        this.props.settingsNotReady();
    };

    handleAppStateChange = nextAppState => {
        if (
            this.state.appState &&
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            if (this.props.garageHostReady && this.props.gateHostReady) {
                this.props.getGarageDoorStatus();
                this.props.getGateStatus();
            } else if (
                !this.props.retrievingHosts &&
                !this.props.settingsReady &&
                !this.props.settingsLoading
            ) {
                this.props.initialize();
            }
        }
        //TODO: Reduce
        this.setState({ appState: nextAppState });
    };

    garageDoorPress = (door, host) => {
        return this.props.moveDoorAction(door, host);
    };

    gatePress = host => {
        return this.props.moveGateAction(host);
    };

    render() {
        return (
            <HomeScreen
                hubConnection={this.props.hubConnection}
                garageDoorPress={this.garageDoorPress}
                socket={this.props.socket}
                gatePress={this.gatePress}
            />
        );
    }
}
const mapStateToProps = state => ({
    ...state,
    socket: state.socketIoReducer.socket,
    hubConnection: state.signalRReducer.hubConnection,
    garageHostReady: state.zeroconfReducer.garageHost !== undefined,
    gateHostReady: state.zeroconfReducer.gateHost !== undefined,
    retrievingHosts: state.zeroconfReducer.retrievingHosts,
    settingsReady: state.settingsReducer.settingsReady,
    settingsLoading: state.settingsReducer.settingsLoading,
});
const mapDispatchToProps = dispatch => ({
    moveDoorAction: (door, host) => dispatch(moveDoorAction(door, host)),
    moveGateAction: host => dispatch(moveGateAction(host)),
    retrieveHosts: () => dispatch({ type: RETRIEVE_HOSTS }),
    initialize: settingsReady => dispatch(initializeSettings(settingsReady)),
    getGateStatus: () => dispatch({ type: GET_GATE_STATE }),
    getGarageDoorStatus: () => dispatch({ type: GET_GARAGE_STATE }),
    settingsNotReady: () => dispatch({ type: SETTINGS_NOT_READY }),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);
