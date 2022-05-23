import {clickMode, DataConfigType} from "../../../../Module/dataModule/schemas";
import {fileTypeFilter} from "../../../../Module/selectModule/configLibrary";
import {deletePlugins} from "../../../../Module/popupWindow/exampleConfig";

export const pluginsTitleConfig = {
    search: true,
    editChangePage: {
        active: true,
        link: "/layout",
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
        link: "/layout/accountSetting"
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
    ...fileTypeFilter
}

export const pluginsSortConfig = {
    block: "5%",
    field: [
        {title: "pluginsSchemasName", width: '75%'},
        {title: "fileType", width: '20%'},
    ]
}

export const pluginsDataConfig: DataConfigType = {
    createFolder: true,
    noDataTextId: "accountSetting.plugins.noData",
    clickMode: clickMode.single,
    checkKey: "pluginsSchemasName",
    rowPhoto: "fileType",
    row: {
        "pluginsSchemasName": {width: '75%', photo: false},
        "fileType": {width: '20%'}
    }
}