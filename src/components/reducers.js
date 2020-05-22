import { combineReducers } from "redux";
import garageDoorReducer from "./GarageDoor/GarageDoorReducer";
import gateReducer from "./Gate/GateReducer";
import homeReducer from "./Home/HomeReducer";
import zeroconfReducer from "../middleware/ZeroconfReducer";
import socketIoReducer from "../middleware/SocketIoReducer";
import signalRReducer from "../middleware/SignalRReducer";
import settingsReducer from "./Settings/SettingsReducer";

export default combineReducers({
    garageDoorReducer,
    gateReducer,
    homeReducer,
    zeroconfReducer,
    socketIoReducer,
    signalRReducer,
    settingsReducer,
});
