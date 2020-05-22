import appConstants from "../constants/app-constants";

export default class GarageDoorService {
    static MoveDoor(door, host, psk) {
        switch (door) {
            case appConstants.LeftDoor:
                return this.SwitchDoor("SwitchLeftGarageDoor", host, psk);
            case appConstants.RightDoor:
                return this.SwitchDoor("SwitchRightGarageDoor", host, psk);
        }
    }

    static SwitchDoor(endpoint, garageHost, psk) {
        if (garageHost) {
            return fetch(`${garageHost}/${endpoint}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `${psk}`,
                },
                body: JSON.stringify({}),
            })
                .then(this.handleErrors)
                .then(resp => {
                    return resp;
                })
                .catch(err => {
                    console.log(
                        "Garage door serivce SwitchDoor Failed",
                        err == null ? "Unknown" : err
                    );
                });
        } else {
            var msg = "SwitchDoor: Host not connected.";
            console.log(msg);

            return Promise.reject(msg);
        }
    }

    static DoorStatuses(garageHost, psk) {
        if (garageHost) {
            return fetch(`${garageHost}/GetGarageDoorStatuses`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `${psk}`,
                },
            })
                .then(this.handleErrors)
                .then(resp => {
                    if (resp.error) {
                        throw resp;
                    }
                    return resp.json();
                })
                .then(resp => {
                    if (resp.error) {
                        throw resp;
                    }
                    return resp;
                })
                .catch(err => {
                    console.log("DoorStatuses Failed", err == null ? "Unknown" : err);
                });
        } else {
            var msg = "DoorStatuses: Host not connected.";
            console.log(msg);

            return Promise.reject(msg);
        }
    }

    handleErrors(response) {
        if (!response.ok) {
            console.log(`Garage door Service error fetching data: ${response.statusText}`);
        }
        return response;
    }
}
