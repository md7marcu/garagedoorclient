const appConstants = {
    // Pi
    //WebApiHost: "http://192.168.86.66:5000",
    // PC
    //WebApiHost: "http://192.168.86.72:5000",
    // GaragePi - Prod
    //WebApiHost: "http://192.168.86.24:5000",
    // GatePi
    //GateApiHost: "http://192.168.86.100:3000",
    // PC - Dev
    //GateApiHost: "http://192.168.86.119:3000",
    SignalStatusTail: "Status",
    HubSuffix: "GarageDoorHub",
    OneSecond: 1000,
    HalfSecond: 500,
    // "Gate" specifics
    GateOpenBus: "gateOpened",
    GateCloseBus: "gateClosed",
    GateMovingBus: "gateMoving",
    GateErrorBus: "gateError",
    GateStateBus: "gateState",
    GateStateEndpoint: "getState",
    DefaultGateIcon: "gate",
    OpenGateIcon: "gate",
    ClosedGateIcon: "gate",
    ErrorGateIcon: "gate",

    GateOpenTitle: "Open",
    GateClosedTitle: "Closed",
    GateDefaultTitle: "Not Connected",
    GateMovingTitle: "Moving",
    GateErrorTitle: "Error",
    ResultOkTitle: "Ok",

    // Garage
    OpenGarageIcon: "garage-open",
    ClosedGarageIcon: "garage",
    ErrorGarageIcon: "garage-alert",
    MovingGarageIcon: "garage",
    LeftDoor: "Left",
    RightDoor: "Right",
    GarageStateEndpoint: "RequestStatus",
    UnknownDoorState: "Not Connected",

    // Other
    MailOpenBus: "mailBoxOpened",
    PackageOpenBus: "packageBoxOpened",
    MailBoxDefaultIcon: "email-open-outline",
    MailBoxOpenedIcon: "email-outline",
    PackageBoxDefaultIcon: "package-variant",
    PackageBoxOpenedIcon: "package-variant-closed",
    ToastDuration: 3000,

    // Settings
    AppColor: "#1a73e8",
    ContainerBackgroundColor: "#FAFAFA",
};
export default appConstants;
