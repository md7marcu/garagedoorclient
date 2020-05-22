import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";
import GarageDoorStyles from "./GarageDoorStyles";

class GarageDoorScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View>
                    <Icon.Button
                        onPress={this.props.moveAction}
                        underlayColor="#2a8ab7"
                        disabled={this.props.disabled}
                        style={this.props.disabled ? GarageDoorStyles.disabledButton : GarageDoorStyles.button}
                        iconStyle={GarageDoorStyles.icon}
                        name={this.props.iconName}
                        size={120}
                    />
                </View>
                <View>
                    <Text style={GarageDoorStyles.stateText}>{this.props.doorPosition}</Text>
                </View>
            </View>
        );
    }
}
export default GarageDoorScreen;
