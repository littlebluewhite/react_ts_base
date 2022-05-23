import {sortActionType, sortInit} from "../../generalReducer/sortModule";
import {dataActionType, dataInit} from "../../generalReducer/dataReducer";
import {clickMode} from "../dataModule/schemas";

export interface tableProps{
    config: configStructure
    data: object[]
    sortState: typeof sortInit
    sortDispatch(action: sortActionType): void
    dataState: typeof dataInit
    dataDispatch(action: dataActionType): void
}

interface configStructure{
    selectButton:clickMode
    sortData:{
        field:sortData[]
    }
}

interface sortData{
    title:string
    width: string
    block?: string
}
