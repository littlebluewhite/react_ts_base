import {iconButtonConfig} from "./data";
import {Dispatch} from "react";

export interface settingTitleType{
    config: settingTitleConfigType
    state: any,
    dispatch: Dispatch<any>
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
    delete: boolean
    createChangePage: boolean
    createOnPage: boolean
    createFolder: boolean
    jsonIn: boolean
    jsonOut: boolean
    csvIn: boolean
    csvOut: boolean
    xlsIn: boolean
    xlsOut: boolean
    information: boolean
    pageControl: boolean
}

export interface iconElementProps{
    name: keyof typeof iconButtonConfig
    direction: string
    clickFunction: Function
}