import {iconButtonConfig} from "./data";
import {Dispatch} from "react";
import {settingGeneralActionType, settingGeneralInit} from "../../generalReducer/settingGeneral";
import {pageControlActionType, pageControlInit} from "../../generalReducer/pageControl";
import {popupWindow3Config} from "../popupWindow/schemas";

export type settingTitleState = typeof settingGeneralInit & typeof pageControlInit

export type settingTitleDispatch = Dispatch<settingGeneralActionType | pageControlActionType>

export interface settingTitleType {
    config: settingTitleConfigType
    state: settingTitleState
    dispatch: settingTitleDispatch
    data: any
}

export interface settingTitleConfigType {
    search: boolean
    editChangePage: editChangePageProps
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

export interface editChangePageProps {
        active: boolean
        link: string
        condition?: (state: any)=>boolean
    }

export interface iconElementProps {
    name: keyof typeof iconButtonConfig
    direction: string
    clickFunction: Function
}

export interface deleteConfig {
    active: boolean
    popupDeleteConfig?: popupWindow3Config
}