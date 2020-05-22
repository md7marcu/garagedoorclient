import React, { Component } from "react";
import { View } from "react-native";
//import { Tabs, Tab, TabHeading, Icon } from "native-base";
import GateComponent from "../Gate/GateComponent";
import GarageDoorComponent from "../GarageDoor/GarageDoorComponent";
// import MailComponent from "../Mail/MailComponent";
// import PackageComponent from "../Package/PackageComponent";
import HomeStyles from "./HomeStyles";
import { Container, Root } from "native-base";
import appConstants from "../../constants/app-constants";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <Container>
                    <View style={HomeStyles.main}>
                        <View style={HomeStyles.rowed}>
                            <View>
                                <GarageDoorComponent
                                    hubConnection={this.props.hubConnection}
                                    door={appConstants.LeftDoor}
                                    click={this.props.garageDoorPress}
                                    garageHost={this.props.garageHost}
                                />
                            </View>
                            <View>
                                <GarageDoorComponent
                                    hubConnection={this.props.hubConnection}
                                    door={appConstants.RightDoor}
                                    click={this.props.garageDoorPress}
                                    garageHost={this.props.garageHost}
                                />
                            </View>
                        </View>
                        <View style={HomeStyles.rowed}>
                            <View>
                                <GateComponent
                                    socket={this.props.socket}
                                    click={this.props.gatePress}
                                    gateHost={this.props.gateHost}
                                />
                            </View>
                        </View>
                    </View>
                </Container>
            </Root>
        );
    }
}
export default HomeScreen;
/* 
                    <Tabs>
                        <Tab heading={<TabHeading><Icon name={"md-wine"} /></TabHeading>}>
</Tab>
                        <Tab heading={<TabHeading><Icon name={"settings"} /></TabHeading>}>
                            <View>
                                <View>
                                <SettingsScreen userSettings={this.props.userSettings} />
                                </View>
                            </View>
                        </Tab>
                    </Tabs>
</View>
*/
/* <View>
<PackageComponent
    socket = {this.props.socket}
/>
</View>
<View>
<MailComponent
    socket = {this.props.socket}
/>
</View> */
