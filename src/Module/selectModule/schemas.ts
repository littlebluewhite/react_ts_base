import {ChangeEvent} from "react";

export interface selectModuleType {
    changeSelect: (event: ChangeEvent<HTMLSelectElement>) => void
    value: string
    data: {
        id: string
        textId: string
        option: optionType[]
    }
}

export interface optionType {
    textId: string
    value: string
}
