import appConstants from "./app-constants";

export class GateConfig  {
    static getOpenConfig () {
        return {
            iconName: `${appConstants.OpenGateIcon}`,
            gatePosition: `${appConstants.GateOpenTitle}`,
        };
    };

    static getClosedConfig(){
        return {
            iconName: `${appConstants.ClosedGateIcon}`,
            gatePosition: `${appConstants.GateClosedTitle}`,
        };
    };

    static getMovingConfig(){
        return {
            iconName: `${appConstants.OpenGateIcon}`,
            gatePosition: `${appConstants.GateMovingTitle}`,
        };
    };

    static getErrorConfig(){
        return {
            iconName: `${appConstants.ErrorGateIcon}`,
            gatePosition: `${appConstants.GateErrorTitle}`,
        };
    };

    static getDefaultConfig(){
        return {
            iconName: `${appConstants.ErrorGateIcon}`,
            gatePosition: `${appConstants.GateDefaultTitle}`,
        };
    };
};
