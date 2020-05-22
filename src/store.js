import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { createLogger } from "redux-logger";
import { composeWithDevTools } from "remote-redux-devtools";
import rootReducer from "./components/reducers";
import { retrieveHostsAction } from "./middleware/ZeroconfActions";
import { getGateStateAction } from "./middleware/SocketIoActions";
import { getGarageStateAction } from "./middleware/SignalRActions";

//TODO: logger crashes the app (hangs/unresponsive)
// const logger = createLogger({
//     level: "log", //"warn",
//     logErrors:true,
// });
const composeEnhancers = composeWithDevTools({
    realtime: true,
    host: "127.0.0.1",
    port: 2024,
});

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                thunk,
                retrieveHostsAction,
                getGateStateAction,
                getGarageStateAction
                /*, logger*/
            )
        )
    );
}
