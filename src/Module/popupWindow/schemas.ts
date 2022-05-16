
export enum popupStatus {
    page1,
    page2,
}

export interface popupWindow1Params {
    config: {page1: page1Structure}
    func1?: Function
}

export interface popupWindow2Params {
    config: {page2: page2Structure}
    func2?: Function
}

export interface popupWindow3Params{
    config: confStructure
    func1?: Function
    func2?: Function
}

export interface confStructure {
    page1: page1Structure
    page2: page2Structure
}

interface page1Structure {
    title: string
    button1: string
    button2: string
}

interface page2Structure {
    title: string
    context: string
    button: string
    titleImage: string
}