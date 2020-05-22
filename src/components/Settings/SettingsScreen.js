import React, { Component } from "react";
import { FlatList } from "react-native";
import { Text, ListItem, Left, Right, Icon } from "native-base";
import SettingsStyles from "./SettingsStyles";
import HR from "../../helpers/hr";
import DynamicControl from "../../helpers/dynamic-control";

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderSeparator = () => {
        return <HR />;
    };

    renderItemIcon(iconName) {
        if (!iconName) {
            return null;
        }
        return <Icon active name={iconName} style={SettingsStyles.sidebarIcon} />;
    }

    renderListItem = ({ item }) => {
        return (
            <ListItem
                noIndent
                style={[SettingsStyles.ListItemNoBorder, SettingsStyles.ListItemNoPadding]}
            >
                <Left>
                    {this.renderItemIcon(item.icon)}
                    <Text>{item.label}</Text>
                </Left>
                <Right style={{ flex: 1 }}>
                    <DynamicControl
                        controlType={item.controlType}
                        defaultValue={
                            item.value !== undefined && item.value != null
                                ? item.value
                                : item.defaultValue
                        }
                        options={item.options}
                        onSetValue={newValue => {
                            item.value = newValue;
                        }}
                    />
                </Right>
            </ListItem>
        );
    };

    render() {
        var settings = this.props.userSettings;

        return (
            <FlatList
                data={settings}
                renderItem={this.renderListItem}
                keyExtractor={item => item.key}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}
export default SettingsScreen;
