"use strict";
import {
    createMaterialTopTabNavigator,
    createStackNavigator,
    createAppContainer,
} from "react-navigation";
import HomeComponent from "./src/components/Home/HomeComponent";
import SettingsComponent from "./src/components/Settings/SettingsComponent";
import { Root } from "native-base";
import React from "react";

const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: HomeComponent,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    Settings: {
        screen: SettingsComponent,
    },
});

TabNavigator.navigationOptions = {
    headerTitle: "Jötunheimr",
    headerStyle: {
        backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold",
    },
};

const AppNavigator = createStackNavigator({
    Home: TabNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

export default () => (
    <Root>
        <AppContainer />
    </Root>
);
