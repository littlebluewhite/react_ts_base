import {clickMode, DataConfigType, elementType} from "../../../../Module/dataModule/schemas";
import {fileType_filter} from "../../../../Module/selectModule/configLibrary";
import {deletePlugins} from "../../../../Module/popupWindow/exampleConfig";
import {settingTitleConfigType} from "../../../../Module/settingTitle/schemas";

export const pluginsTitleConfig: settingTitleConfigType = {
    search: true,
    editChangePage: {
        active: true,
        link: "/layout/accountSetting/plugins/editor",
        condition: (state: any) => {
            const name = Object.keys(state.check)[0]
            return name.slice(-3) === "csv";
        }
    },
    editOnPage: {
        active: false,
    },
    delete: {
        active: true,
        popupDeleteConfig: {...deletePlugins}
    },
    createChangePage: {
        active: true,
        link: "/layout/accountSetting/plugins/create"
    },
    createOnPage: {
        active: false,
    },
    createFolder: {
        active: true,
    },
    jsonIn: {
        active: false,
    },
    jsonOut: {
        active: false,
    },
    csvIn: {
        active: false,
    },
    csvOut: {
        active: false,
    },
    xlsIn: {
        active: false,
    },
    xlsOut: {
        active: false,
    },
    information: {
        active: false,
    },
    pageControl: true
}

export const pluginsFilterConfig = {
    ...fileType_filter
}

export const pluginsSortConfig = {
    block: "5%",
    field: [
        {title: "pluginsSchemasName", width: '75%'},
        {title: "fileType", width: '20%'},
    ]
}

export const pluginsDataConfig: DataConfigType = {
    noDataTextId: "accountSetting.plugins.noData",
    clickMode: clickMode.single,
    checkKey: "pluginsSchemasName",
    rowPhoto: {
        field: "fileType",
        item: {
            "fileType-0": {
                hoverTextId: "accountSetting.plugins.openFolder",
            }
        }
    },
    row: {
        "pluginsSchemasName": {width: '75%', photo: false},
        "fileType": {width: '20%', type: elementType.value}
    }
}