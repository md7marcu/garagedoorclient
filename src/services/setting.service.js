import settings from "../settings";
import { AsyncStorage } from "react-native";
import { merge, uniqBy } from "lodash";

export default class SettingService {
    static getUserSettings = async () => {
        try {
            var userSettings = await retrieveData();
            console.log(`SettingService: retrieved settings: ${userSettings}`);

            if (!userSettings || userSettings === {} || userSettings === "[]") {
                userSettings = settings;
            }
            userSettings =
                typeof userSettings === "string" ? JSON.parse(userSettings) : userSettings;

            // If settings has been added to the settings object after settings has been saved 
            // the new values need to be merged in
            return uniqBy(merge(userSettings, settings), "key");
        } catch (error) {
            console.log(`SettingsService: exception while retrieving settings: ${error}.`);
        }
    };

    static saveUserSettings = async userSettings => {
        try {
            return storeData(userSettings);
        } catch (error) {
            console.log(`SettingsSerivce: failed to save settings ${error}`);
        }
    };

    static removeUserSettings = async () => {
        try {
            await removeData();
            console.log("SettingService: removed userSettings");
        } catch (error) {
            console.log(`SettingsService: exception while trying to remove settings. ${error}`);
        }
    };
}

const removeData = async () => {
    try {
        return await AsyncStorage.removeItem("@UserSettings:key");
    } catch (error) {
        throw `SettingsSerivce: Could not remove settings ${error}`;
    }
};

const storeData = async userSettings => {
    try {
        var val = typeof userSettings === "object" ? JSON.stringify(userSettings) : userSettings;

        return await AsyncStorage.setItem("@UserSettings:key", val);
    } catch (error) {
        throw `SettingsSerivce: Could not save settings ${error}`;
    }
};

const retrieveData = async () => {
    try {
        return await AsyncStorage.getItem("@UserSettings:key");
    } catch (error) {
        throw `SettingsSerivce: Could not retrieve settings ${error}`;
    }
};
