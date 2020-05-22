import { AppRegistry } from "react-native";
import App from "./App";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./src/store";
import React from "react";

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"]);

// export so that the settings can be read from actions
export const store = configureStore();

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent("GarageDoorClient", () => ReduxApp);
