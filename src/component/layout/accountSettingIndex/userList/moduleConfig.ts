import {deleteUserList} from "../../../../Module/popupWindow/exampleConfig";
import {clickMode, DataConfigType, elementType} from "../../../../Module/dataModule/schemas";
import {settingTitleConfigType} from "../../../../Module/settingTitle/schemas";

export const userListTitleConfig: settingTitleConfigType = {
    search: true,
    editChangePage: {
        active: true,
        link: "/layout/accountSetting/userList/editor",
    },
    editOnPage: {
        active: false,
    },
    delete: {
        active: true,
        popupDeleteConfig: {...deleteUserList}
    },
    createChangePage: {
        active: true,
        link: "/layout/accountSetting/userList/create"
    },
    createOnPage: {
        active: false,
    },
    createFolder: {
        active: false,
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

export const userListSortConfig = {
    block: "2.5%",
    field: [
        {title: "username", width: '20%'},
        {title: "accessLevel", width: '20%'},
        {title: "subCompany", width: '17.5%'},
        {title: "name", width: '20%'},
        {title: "loginTime", width: '20%'},
    ]
}

export const userListDataConfig: DataConfigType = {
    noDataTextId: "noMatchData",
    clickMode: clickMode.single,
    checkKey: "username",
    row: {
        "username": { width: '20%'},
        "accessLevel": { width: '20%'},
        "subCompany": { width: '17.5%'},
        "name": { width: '20%'},
        "loginTime": { width: '20%', type: elementType.time},
    }
}