import React, { Component } from "react";
import appConstants from "../../constants/app-constants";
import { connect } from "react-redux";
import { moveAction } from "./GarageDoorActions";
import GarageDoorScreen from "./GarageDoorScreen";
import { GET_GARAGE_STATE } from "../../constants/action-constants";
import { find } from "lodash";

class GarageDoorComponent extends Component {
    constructor(props) {
        super(props);
        this.moveAction = this.moveAction.bind(this);
    }

    moveAction = event => {
        this.props.moveAction(this.props.click, this.props.door, this.props.garageHost);
    };

    render() {
        var disabled = !this.props.garageHostReady;
        var doorConfig = find(this.props.doorConfigs, ["door", this.props.door]);

        return (
            <GarageDoorScreen
                moveAction={this.moveAction}
                doorPosition={doorConfig ? doorConfig.position : appConstants.UnknownDoorState}
                iconName={disabled ? appConstants.ErrorGarageIcon :
                                       doorConfig ? doorConfig.iconName : appConstants.ErrorGarageIcon}
                disabled={disabled}
            />
        );
    }
}

const mapStateToProps = state => ({
    ...state,
    garageHost: state.zeroconfReducer.garageHost,
    garageHostReady: state.zeroconfReducer.garageHost !== undefined,
    hubConnection: state.signalRReducer.hubConnection,
    doorConfigs: state.garageDoorReducer.doors,
});
const mapDispatchToProps = dispatch => ({
    moveAction: (click, door, host) => dispatch(moveAction(click, door, host)),
    getGarageDoorStates: () => dispatch({ type: GET_GARAGE_STATE }),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GarageDoorComponent);
