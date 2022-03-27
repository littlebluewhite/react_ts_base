import {layoutActionType, layoutStateInit} from "../../reducer/layout/layoutReducer";
import {Dispatch, SetStateAction} from "react";

export interface headerProps {
    state: typeof layoutStateInit
    dispatch: Dispatch<layoutActionType>
}

export interface asideProps {
    state: typeof layoutStateInit
    dispatch: Dispatch<layoutActionType>
}

export interface controlAsideProps{
    state: typeof layoutStateInit
    dispatch: Dispatch<layoutActionType>
}

export interface asideContainerProps{
    state: typeof layoutStateInit
}

export interface asideSecondTopicProps{
    state: typeof layoutStateInit
    dispatch: Dispatch<layoutActionType>
}

export enum topicEnum{
    "firstTopic",
    "secondTopic"
}

export interface topicDataType{
    id: string
    permission: (string | number)[] | boolean
    subData?: any
}

export interface headerSecondTopicProps{
    secondData: any
    count: number
    pathname: string
}

export interface personalMenuProps{
    setShowModel: Dispatch<SetStateAction<boolean>>
    stateInit?: personalStatus
    personalSelectInit?: personalSettingSelect
}

export interface personalSettingProps{
    setShowModel: Dispatch<SetStateAction<boolean>>
    personalSelectInit?: personalSettingSelect
}

export enum personalSettingSelect {
    "profile",
    "language"
}

export interface personalSettingBarProps{
    select: personalSettingSelect
    setSelect: Dispatch<SetStateAction<personalSettingSelect>>
}

export enum personalStatus{
    "menu",
    "personalSetting"
}

export interface upAsideElementProps{
    topic: string
    firstTopicIsOpen: boolean
}
