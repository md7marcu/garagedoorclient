import { GARAGE_DOOR_STATE } from "../../constants/action-constants";
import { some, remove } from "lodash";
import { GarageState } from "../../constants/garageState";
import appConstants from "../../constants/app-constants";

//TODO 12/7: Not dynamic - might not be needed when refactoring complete
const initialState = {
    doors: [
        {
            door: "left",
            position: appConstants.UnknownDoorState,
            iconName: appConstants.ClosedGarageIcon,
        },
        {
            door: "right",
            position: appConstants.UnknownDoorState,
            iconName: appConstants.ClosedGarageIcon,
        },
    ],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GARAGE_DOOR_STATE:
            if (!state.doors) {
                var doors = [];
            } else {
                doors = state.doors;
            }
            if (!some(state.doors, { door: action.door })) {
                doors.push({
                    door: action.door,
                    position: action.position,
                    iconName: doorStateChange(action.position),
                });
            } else {
                //TODO: Compare if equal first, profile...
                remove(doors, obj => obj.door === action.door);
                doors.push({
                    door: action.door,
                    position: action.position,
                    iconName: doorStateChange(action.position),
                });
            }
            return {
                ...state,
                doors,
            };
        default:
            return state;
    }
};

function doorStateChange(doorPosition) {
    switch (doorPosition) {
        case GarageState.Open:
        case GarageState.Opening:
            return `${appConstants.OpenGarageIcon}`;
        case GarageState.Closed:
        case GarageState.Closing:
            return `${appConstants.ClosedGarageIcon}`;
        case GarageState.Error:
            return `${appConstants.ErrorGarageIcon}`;
        case GarageState.Moving:
        default:
            return `${appConstants.MovingGarageIcon}`;
    }
}
