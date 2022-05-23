import {iconButtonConfig} from "./data";
import {Dispatch} from "react";
import {settingGeneralActionType, settingGeneralInit} from "../../generalReducer/settingGeneral";
import {pageControlActionType, pageControlInit} from "../../generalReducer/pageControl";
import {popupConfig, popupWindow3Params} from "../popupWindow/schemas";

export type settingTitleState = typeof settingGeneralInit & typeof pageControlInit

export type settingTitleDispatch = Dispatch<settingGeneralActionType | pageControlActionType>

export interface settingTitleType {
    config: settingTitleConfigType
    state: settingTitleState
    dispatch: settingTitleDispatch
    data: any
    deleteFunc1?: Function
    deleteFunc2?: Function
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
    delete: deleteConfig
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

export interface deleteConfig {
    active: boolean
    popupDeleteConfig?: popupConfig
}