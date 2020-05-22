import React, { Component } from "react";
import { connect } from "react-redux";
import { getSettings, saveSettings, initializeSettings } from "../Settings/SettingsActions";
import SettingsScreen from "./SettingsScreen";

class SettingsComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.addListener("willBlur", () =>
            this.props.saveSettings(this.props.userSettings)
        );
        this.props.navigation.addListener("willFocus", () => this.settings());
    }

    componentWillUnmount() {
        this.props.navigation.removeListener(
            "willBlur",
            this.props.saveSettings(this.props.userSettings)
        );
        this.props.navigation.removeListener("willFocus", () => this.settings());
    }

    settings = () => {
        return this.props.getSettings(this.props.settingsReady);
    };

    render() {
        return (
            <SettingsScreen
                navigation={this.props.navigation}
                userSettings={this.props.userSettings}
            />
        );
    }
}
const mapStateToProps = state => ({
    ...state,
    userSettings: state.settingsReducer.userSettings,
    settingsReady: state.settingsReducer.settingsReady,
});

const mapDispatchToProps = dispatch => ({
    getSettings: settingsReady => dispatch(getSettings(settingsReady)),
    saveSettings: settings => dispatch(saveSettings(settings)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsComponent);
