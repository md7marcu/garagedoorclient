import React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { View, Text, Icon, CheckBox, Picker, Input } from "native-base";
import ControlType from "../constants/control-type";
import appConstants from "../constants/app-constants";

const styles = StyleSheet.create({
    numberIncrementMinus: {
        color: "#666666",
    },
    numberIncrementPlus: {
        color: appConstants.AppColor,
    },
    numberIncrementValue: {
        width: 30,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    dropDown: {
        width: Platform.OS === "ios" ? undefined : 150,
        marginRight: -15,
    },
    checkBox: {
        marginRight: 10,
    },
});

class DynamicControl extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue,
        };
    }

    renderCheckBox() {
        return (
            <CheckBox
                style={styles.checkBox}
                checked={this.state.value}
                onPress={() => {
                    const newValue = !this.state.value;
                    this.setState({ value: newValue });
                    this.props.onSetValue(newValue);
                }}
            />
        );
    }
    renderDropdown() {
        return (
            <Picker
                style={styles.dropDown}
                selectedValue={this.state.value}
                mode="dropdown"
                iosIcon={<Icon name={"chevron-down"} />}
                onValueChange={value => {
                    this.setState({ value });
                    this.props.onSetValue(value);
                }}
            >
                {this.props.options.map((item, i) => (
                    <Picker.Item label={item.label} value={item.value} key={i} />
                ))}
            </Picker>
        );
    }

    renderTextField() {
        return (
            <Input
                style={this.props.style}
                onChangeText={value => this.props.onSetValue(value)}
                defaultValue={this.props.defaultValue}
            />
        );
    }

    renderNumberIncrement() {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => {
                        if (this.state.value > appConstants.MinTextSize) {
                            const newValue = +this.state.value - 1;
                            this.setState({ value: newValue });
                            this.props.onSetValue(newValue);
                        }
                    }}
                    activeOpacity={0.8}
                >
                    <Icon active style={styles.numberIncrementMinus} name={"minus-circle"} />
                </TouchableOpacity>
                <View style={styles.numberIncrementValue}>
                    <Text>{this.state.value}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (this.state.value < appConstants.MaxTextSize) {
                            const newValue = +this.state.value + 1;
                            this.setState({ value: newValue });
                            this.props.onSetValue(newValue);
                        }
                    }}
                    activeOpacity={0.8}
                >
                    <Icon active style={styles.numberIncrementPlus} name={"plus-circle"} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        switch (this.props.controlType) {
            case ControlType.CheckBox:
                return this.renderCheckBox();
            case ControlType.Dropdown:
                return this.renderDropdown();
            case ControlType.NumberIncrement:
                return this.renderNumberIncrement();
            case ControlType.TextField:
                return this.renderTextField();
            default:
                return null;
        }
    }
}

export default DynamicControl;
