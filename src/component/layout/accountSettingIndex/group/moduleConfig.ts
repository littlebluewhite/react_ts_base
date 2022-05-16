import {sortConfigType} from "../../../../Module/sortModule/schemas";

export const groupTitleConfig = {
    search: true,
    editChangePage: {
        active: false,
        link: "/layout",
    },
    editOnPage: {
        active: true,
    },
    delete: {
        active: false,
    },
    createChangePage: {
        active: false,
        link: "/layout/accountSetting"
    },
    createOnPage: {
        active: true,
    },
    createFolder: {
        active: false,
    },
    jsonIn: {
        active: true,
    },
    jsonOut: {
        active: true,
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
        active: true,
    },
    pageControl: false
}

export const groupSortConfig: sortConfigType[] = [
    {title: "group", style: {width: '85%'}},
    {title: "latestUpdate", style: {width: '15%'}},
]