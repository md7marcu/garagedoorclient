import { Toast } from "native-base";
import appConstants from "../constants/app-constants";
import { store } from "../../index";
import { storageKeysConstants } from "../constants/storage-keys.constant";
import { find } from "lodash";

export default class ToastFacade {
    static show(text, type) {
        let showToasts = find(
            store.getState().settingsReducer.userSettings,
            setting => setting.key === storageKeysConstants.ENABLE_TOASTS
        );

        if (showToasts && showToasts.value) {
            Toast.show({
                text: text,
                position: "bottom",
                textStyle: { textAlign: "center" },
                duration: appConstants.ToastDuration,
                type: type,
            });
        }
    }
}
