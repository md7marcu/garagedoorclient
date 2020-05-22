import GarageDoorService from "../../services/garagedoor.service";
import GateService from "../../services/gate.service";
import { GARAGE_MOVE, GATE_MOVE } from "../../constants/action-constants";
import { store } from "../../../index";
import { find } from "lodash";
import { storageKeysConstants } from "../../constants/storage-keys.constant";

const moveDoor = (door, host) => {
    return {
        type: GARAGE_MOVE,
        door: door,
        host: host,
    };
}

const moveGate = (door, host) => {
    return {
        type: GATE_MOVE,
        door: door,
        host: host,
    };
}

const getToken = () => {
    let token = find(
        store.getState().settingsReducer.userSettings,
        setting => setting.key === storageKeysConstants.IDENTITY_GUID
    );

    return `Bearer ${token ? token.value : ""}`;
};

export const moveDoorAction = (door, host) => dispatch => {
    dispatch(moveDoor(door, host));

    return GarageDoorService.MoveDoor(door, host, getToken());
};

export const moveGateAction = host => dispatch => {
    dispatch(moveGate(host));

    return GateService.MoveGate(host, getToken());
};
