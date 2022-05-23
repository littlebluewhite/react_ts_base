import {deleteUserList} from "../../../../Module/popupWindow/exampleConfig";

export const userListTitleConfig = {
    search: true,
    editChangePage: {
        active: true,
        link: "/layout",
    },
    editOnPage: {
        active: true,
    },
    delete: {
        active: true,
        popupDeleteConfig: {...deleteUserList}
    },
    createChangePage: {
        active: true,
        link: "/layout/accountSetting"
    },
    createOnPage: {
        active: true,
    },
    createFolder: {
        active: true,
    },
    jsonIn: {
        active: true,
    },
    jsonOut: {
        active: true,
    },
    csvIn: {
        active: true,
    },
    csvOut: {
        active: true,
    },
    xlsIn: {
        active: true,
    },
    xlsOut: {
        active: true,
    },
    information: {
        active: true,
    },
    pageControl: true
}