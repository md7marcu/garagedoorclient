import color from "color";
import { Platform } from "react-native";
import { appConstants } from "../constants/app-constants";

const styles = {
    container: {
        backgroundColor: appConstants.ContainerBackgroundColor,
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    shadow: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    inputIcon: {
        opacity: 0.5,
    },
    textError: {
        color: "#f44336",
        textAlign: "center",
        fontSize: 12,
    },
    textCenter: {
        textAlign: "center",
    },
    contentCenter: {
        alignItems: "center",
    },
    header: {
        paddingTop: 30,
        paddingBottom: 20,
    },
    ListItemNoBorder: {
        borderBottomWidth: 0,
    },
    ListItemNoPadding: {
        paddingLeft: 0,
        paddingRight: 10,
        marginLeft: 0,
    },
    headerLessTabs: {
        marginTop: Platform.OS === "ios" ? 20 : undefined,
    },
    smallLink: {
        fontSize: 12,
    },
    colorBlack: {
        color: "#000",
    },
    colorWhite: {
        color: "#FFF",
    },
    ModalCenterScreen: {
        height: 300,
        width: 300,
    },
    modalButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    alignCenterMiddle: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    solidInput: {
        backgroundColor: color("#EAEAEA")
            .darken(0.1)
            .hex(),
        color: "#555555",
        borderRadius: 5,
        marginTop: 5,
        height: 40,
    },
    headerSearchInputContainer: {
        backgroundColor: color(appConstants.AppColor)
            .darken(0.1)
            .hex(),
        borderRadius: 8,
        flex: 5,
    },
    headerSearchInput: {
        color: "#FFF",
    },
    headerSearchIcon: {
        color: "#FFF",
    },
    actionButtonRight: {
        position: "absolute",
        top: -15,
        right: -15,
    },
    subHeaderCard: {
        backgroundColor: "#EAEAEA",
    },
    solidFlatBox: {
        backgroundColor: color("#EAEAEA")
            .darken(0.1)
            .hex(),
        padding: 10,
    },
    flatBoxTitle: {
        color: "#000",
        fontSize: 14,
        marginBottom: 15,
    },
    borderTop: {
        height: 1,
        backgroundColor: "#ffffff",
    },
    borderBottom: {
        height: 1,
        backgroundColor: color("#EAEAEA")
            .darken(0.1)
            .hex(),
    },
};
export default styles;
