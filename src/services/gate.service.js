export default class GateService {
    static MoveGate(gateHost, psk) {
        if (gateHost) {
            return fetch(`${gateHost}/MoveGate`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `${psk}`,
                },
                body: JSON.stringify({}),
            })
                .then(this.handleErrors)
                .catch(err => {
                    console.log("Gate service MoveGate Failed", err == null ? "Unknown" : err);
                });
        } else {
            var msg = "MoveGate: Host not connected.";
            console.log(msg);

            return Promise.reject(msg);
        }
    }

    static Info(gateHost, psk) {
        if (gateHost) {
            return fetch(`${gateHost}/GetInfo`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `${psk}`,
                },
            })
                .then(this.handleErrors)
                .then(resp => {
                    return resp.json();
                })
                .then(resp => {
                    if (resp.error) {
                        throw resp;
                    }
                    return resp;
                })
                .catch(err => {
                    console.log("Gate service Info Failed", err == null ? "Unknown" : err);
                });
        } else {
            var msg = "Info: Host not connected.";
            console.log(msg);

            return Promise.reject(msg);
        }
    }
    handleErrors(response) {
        if (!response.ok) {
            console.log(`Gate service error fetching data: ${response.statusText}`);
        }
        return response;
    }
}
