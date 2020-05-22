import {
    GATE_OPEN_EVENT,
    GATE_CLOSED_EVENT,
    GATE_MOVING_EVENT,
    GATE_ERROR_EVENT,
} from "../../constants/action-constants";
import { GateConfig } from "../../constants/gateConfig";
import appConstants from "../../constants/app-constants";

const initialState = {
    iconName: appConstants.ErrorGateIcon,
    gatePosition: appConstants.GateDefaultTitle,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GATE_OPEN_EVENT:
            var config = GateConfig.getOpenConfig();
            return {
                ...state,
                iconName: config.iconName,
                gatePosition: config.gatePosition,
            };
        case GATE_CLOSED_EVENT:
            config = GateConfig.getClosedConfig();
            return {
                ...state,
                iconName: config.iconName,
                gatePosition: config.gatePosition,
            };
        case GATE_MOVING_EVENT:
            config = GateConfig.getMovingConfig();
            return {
                ...state,
                iconName: config.iconName,
                gatePosition: config.gatePosition,
            };
        case GATE_ERROR_EVENT:
            config = GateConfig.getErrorConfig();
            return {
                ...state,
                iconName: config.iconName,
                gatePosition: config.gatePosition,
            };
        default:
            return state;
    }
};
