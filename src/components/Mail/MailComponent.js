import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import appConstants from "./../../constants/app-constants";

export default class MailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
             iconName: `${appConstants.MailBoxDefaultIcon}`,
        };

        this.handleClick = this.handleClick.bind(this);
        this.setupSocketListener = this.setupSocketListener.bind(this);
    }

    handleClick(){
        console.log("Clicked email");
        this.setState({iconName: `${appConstants.MailBoxDefaultIcon}`});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            if (nextProps && nextProps.socket){
                this.setupSocketListener(nextProps.socket);
            }
        }
    }

    setupSocketListener(socket){
        socket.on(`${appConstants.MailOpenBus}`, (data) => {
            this.setState({
                    iconName: `${appConstants.MailBoxOpenedIcon}`,
            });
        });
    }

    render() {
        let button;

        if (this.state.iconName !== appConstants.MailBoxDefaultIcon){
            button = <Icon.Button
                        onPress={this.handleClick}
                        underlayColor="#2a8ab7"
                        style={styles.mailButton}
                        iconStyle={styles.icon}
                        name={this.state.iconName} size={40}
                    />;
        }

        return (<View>{button}</View>);
    }

}

const styles = StyleSheet.create({
    mailButton: {
        backgroundColor: "#2a8ab7",
        borderColor:  "#a5e2ff",
        borderWidth: 1,
    },
    icon: {
        marginLeft: 10,
    },
});
