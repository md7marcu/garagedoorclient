import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";

const styles = StyleSheet.create({
    hr: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
    },
});

class HR extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.hr} />;
    }
}

export default HR;
