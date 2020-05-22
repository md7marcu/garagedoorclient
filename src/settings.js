import { storageKeysConstants } from "./constants/storage-keys.constant";
import { SettingCategory } from "./constants/setting-category";
import ControlType from "./constants/control-type";
import { SettingValueType } from "./constants/setting-value-type";

export default [
    {
        key: storageKeysConstants.NUMBER_OF_DOORS,
        label: "Select number of doors",
        category: SettingCategory.General,
        controlType: ControlType.Dropdown,
        type: SettingValueType.String,
        defaultValue: 2,
        options: [
            {
                key: "Door1",
                label: "One Door",
                value: 1,
            },
            {
                key: "Door2",
                label: "Two Doors",
                value: 2,
            },
            {
                key: "Door3",
                label: "Three Doors",
                value: 3,
            },
        ],
    },
    {
        key: storageKeysConstants.ENABLE_TOASTS,
        label: "Enable Toast Notifications",
        category: SettingCategory.General,
        controlType: ControlType.CheckBox,
        type: SettingValueType.Boolean,
        defaultValue: false,
    },
    // {
    //     key: storageKeysConstants.ENABLE_MAILBOX,
    //     label: "Enable Mail Box",
    //     category: SettingCategory.General,
    //     controlType: ControlType.CheckBox,
    //     type: SettingValueType.Boolean,
    //     defaultValue: false,
    // },
    // {
    //     key: storageKeysConstants.ENABLE_PACKAGEBOX,
    //     label: "Enable Package Box",
    //     category: SettingCategory.General,
    //     controlType: ControlType.CheckBox,
    //     type: SettingValueType.Boolean,
    //     defaultValue: false,
    // },
    {
        key: storageKeysConstants.ENABLE_GATE,
        label: "Enable Gate",
        category: SettingCategory.General,
        controlType: ControlType.CheckBox,
        type: SettingValueType.Boolean,
        defaultValue: true,
    },
    {
        key: storageKeysConstants.ENABLE_REMOTE_GATE,
        label: "Enable Remote Gate Access",
        category: SettingCategory.General,
        controlType: ControlType.CheckBox,
        type: SettingValueType.Boolean,
        defaultValue: false,
    },
    {
        key: storageKeysConstants.ENABLE_REMOTE_DOOR,
        label: "Enable Remote Garage Door Access",
        category: SettingCategory.General,
        controlType: ControlType.CheckBox,
        type: SettingValueType.Boolean,
        defaultValue: false,
    },
    {
        key: storageKeysConstants.OVERRIDE_DOOR_HOST,
        label: "Override garage host",
        category: SettingCategory.General,
        controlType: ControlType.TextField,
        type: SettingValueType.String,
        defaultValue: "",
    },
    {
        key: storageKeysConstants.OVERRIDE_GATE_HOST,
        label: "Override gate host",
        category: SettingCategory.General,
        controlType: ControlType.TextField,
        type: SettingValueType.String,
        defaultValue: "",
    },
    {
        key: storageKeysConstants.IDENTITY_GUID,
        label: "Identity",
        category: SettingCategory.General,
        controlType: ControlType.TextField,
        type: SettingValueType.String,
        defaultValue: "",
    },
];
