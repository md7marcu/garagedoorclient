import {
    SETTINGS_GET_SUCCESS,
    SETTINGS_FAILURE,
    SETTINGS_SAVE_SUCCESS,
    SETTINGS_LOADING,
    RETRIEVE_HOSTS,
    GATE_HOST_FOUND,
    GARAGE_HOST_FOUND,
    SETUP_GATE_SOCKET,
    SETUP_GARAGE_SOCKET,
    SETUP_GARAGE_LISTENERS,
    SETUP_GATE_LISTENERS,
} from "../../constants/action-constants";
import SettingService from "../../services/setting.service";
import { storageKeysConstants } from "../../constants/storage-keys.constant";
import { find } from "lodash";

function getSettingsSuccess(userSettings) {
    return {
        type: SETTINGS_GET_SUCCESS,
        userSettings: userSettings,
    };
}

function settingsFailure(error) {
    return {
        type: SETTINGS_FAILURE,
        error,
    };
}

const saveSettingsSuccess = () => {
    return {
        type: SETTINGS_SAVE_SUCCESS,
    };
};

export const initializeSettings = () => dispatch => {
    SettingService.getUserSettings()
        .then(
            settings => {
                dispatch({ type: SETTINGS_LOADING });

                if (!getHostsFromNetwork(settings)) {
                    return dispatch({ type: RETRIEVE_HOSTS });
                } else {
                    var gate = find(
                        settings,
                        setting => setting.key === storageKeysConstants.OVERRIDE_GATE_HOST
                    );
                    var door = find(
                        settings,
                        setting => setting.key === storageKeysConstants.OVERRIDE_DOOR_HOST
                    );
                    var gateHost = `http://${gate.value}`;
                    var doorHost = `http://${door.value}`;
                    dispatch({
                        type: GATE_HOST_FOUND,
                        gateHost: gateHost,
                    });
                    dispatch({
                        type: GARAGE_HOST_FOUND,
                        garageHost: doorHost,
                    });
                    //TODO 12/25 duplicated code with Zeroconf
                    dispatch({ type: SETUP_GATE_SOCKET, gateHost: gateHost, isConnecting: true });
                    // Ok - doesn't have to be connected for the listeners to be attached
                    dispatch({ type: SETUP_GATE_LISTENERS });
                    dispatch({ type: SETUP_GARAGE_SOCKET, garageHost: doorHost });
                    //TODO 12/7 - constants - settings loop
                    dispatch({ type: SETUP_GARAGE_LISTENERS, door: "Left" });
                    dispatch({ type: SETUP_GARAGE_LISTENERS, door: "Right" });

                    return dispatch(getSettingsSuccess(settings));
                }
            },
            error => {
                return dispatch({ type: SETTINGS_FAILURE, error: error });
            }
        )
        .catch(err => {
            console.log(`Error while getting settings ${err}`);

            return dispatch({ type: SETTINGS_FAILURE, error: err });
        });
};

const getHostsFromNetwork = settings => {
    var gate = find(settings, setting => setting.key === storageKeysConstants.OVERRIDE_GATE_HOST);
    var door = find(settings, setting => setting.key === storageKeysConstants.OVERRIDE_DOOR_HOST);

    return gate.value || door.value;
};

export const saveSettings = settings => {
    return dispatch =>
        SettingService.saveUserSettings(settings)
            .then(
                () => {
                    return dispatch(saveSettingsSuccess());
                },
                error => {
                    return dispatch(settingsFailure(error));
                }
            )
            .catch(err => console.error(`SettingsMWActions saveSettings exception ${err}`));
};

export const getSettings = () => dispatch => {
    SettingService.getUserSettings()
        .then(settings => dispatch(getSettingsSuccess(settings)),
            error => {
                console.log(`SettingsActions getSettings error ${error}`);

                return dispatch({ type: SETTINGS_FAILURE, error: error });
            }
        )
        .catch(error => {
            console.log(`SettingsActions getSettings exception  ${error}`);

            return dispatch({ type: SETTINGS_FAILURE, error: error });
        });
};
