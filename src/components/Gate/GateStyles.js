import { StyleSheet } from "react-native";

const GateStyles = StyleSheet.create({
    gateStateText: {
        marginTop: 5,
        fontSize: 18,
        color: "white",
        alignSelf: "center",
    },
    gateButton: {
        backgroundColor: "#2a8ab7",
        borderColor:  "#a5e2ff",
        borderWidth: 1,
    },
    disabledGateButton: {
        backgroundColor: "#2a8ab7",
        borderColor:  "#ff0000",
        borderWidth: 1,
    },
    gateIcon: {
        marginLeft: 10,
    },
});

export default GateStyles;
