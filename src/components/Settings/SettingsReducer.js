import {
    SETTINGS_GET_SUCCESS,
    SETTINGS_SAVE_SUCCESS,
    SETTINGS_FAILURE,
    SETTINGS_NOT_READY,
    SETTINGS_LOADING,
} from "../../constants/action-constants";

const initialState = {
    isBusy: true,
    userSettings: [],
    settingsHosts: false,
    settingsReady: false,
    settingsLoading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SETTINGS_GET_SUCCESS:
            return {
                ...state,
                settingsReady: true,
                settingsLoading: false,
                userSettings: action.userSettings,
            };

        case SETTINGS_SAVE_SUCCESS:
            return {
                ...state,
            };

        case SETTINGS_FAILURE:
            return {
                ...state,
                settingsReady: false,
                settingsLoading: false,
                error: action.error,
            };

        case SETTINGS_NOT_READY:
            return {
                ...state,
                settingsReady: false,
            };

        case SETTINGS_LOADING:
            return {
                ...state,
                settingsLoading: true,
                settingsReady: false,
            };

        default:
            return state;
    }
}
