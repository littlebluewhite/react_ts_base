import {iconButtonConfig} from "./data";
import {Dispatch} from "react";

export interface settingTitleType {
    config: settingTitleConfigType
    state: any
    dispatch: Dispatch<any>
    data: any
}

export interface settingTitleConfigType {
    search: boolean
    editChangePage: {
        active: boolean
        link: string
    }
    editOnPage: {
        active: boolean
    }
    delete: {
        active: boolean
    }
    createChangePage: {
        active: boolean
        link: string
    }
    createOnPage: {
        active: boolean
    }
    createFolder: {
        active: boolean
    }
    jsonIn: {
        active: boolean
    }
    jsonOut: {
        active: boolean
    }
    csvIn: {
        active: boolean
    }
    csvOut: {
        active: boolean
    }
    xlsIn: {
        active: boolean
    }
    xlsOut: {
        active: boolean
    }
    information: {
        active: boolean
    }
    pageControl: boolean
}

export interface iconElementProps {
    name: keyof typeof iconButtonConfig
    direction: string
    clickFunction: Function
}
