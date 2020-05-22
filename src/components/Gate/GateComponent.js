import React, { Component } from "react";
import appConstants from "../../constants/app-constants";
import { connect } from "react-redux";
import { moveAction } from "./GateActions";
import GateScreen from "./GateScreen";
import { GET_GATE_STATE } from "../../constants/action-constants";

class GateComponent extends Component {
    constructor(props) {
        super(props);
        this.moveAction = this.moveAction.bind(this);
    }

    moveAction = event => {
        return this.props.moveAction(this.props.click, this.props.gateHost);
    };

    render() {
        var disabled = !this.props.gateHostReady;

        return (
            <GateScreen
                moveAction={this.moveAction}
                gatePosition={disabled ? appConstants.GateDefaultTitle : this.props.gatePosition}
                iconName={disabled ? appConstants.ErrorGateIcon : this.props.iconName}
                disabled={disabled}
            />
        );
    }
}
const mapStateToProps = state => ({
    ...state,
    gateHost: state.zeroconfReducer.gateHost,
    gateHostReady: state.zeroconfReducer.gateHost !== undefined,
    socket: state.socketIoReducer.socket,
    iconName: state.gateReducer.iconName,
    gatePosition: state.gateReducer.gatePosition,
});
const mapDispatchToProps = dispatch => ({
    moveAction: (click, host) => dispatch(moveAction(click, host)),
    getGateState: () => dispatch({ type: GET_GATE_STATE }),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GateComponent);
