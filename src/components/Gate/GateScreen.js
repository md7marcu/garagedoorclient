import React, { Component } from "react";
import GateStyles from "./GateStyles";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class GateScreen extends Component{

    constructor(props){
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
                        style={this.props.disabled ? GateStyles.disabledGateButton : GateStyles.gateButton}
                        iconStyle={GateStyles.gateIcon}
                        name={this.props.iconName} size={120}
                    />
                </View>
                <View>
                    <Text style={GateStyles.gateStateText}>
                        {this.props.gatePosition}
                    </Text>
                </View>
            </View>
        );
    }

}
export default GateScreen;
