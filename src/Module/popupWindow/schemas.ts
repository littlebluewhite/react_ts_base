
export enum popupStatus {
    page1,
    page2,
}

export interface popupWindow1Config {
    page1: page1Structure
}

export interface popupWindow2Config {
    page2: page2Structure
}

export interface popupWindow3Config {
    page1: page1Structure
    page2: page2Structure
}

interface page1Structure {
    title: string
    checkKey?: string
    button1: string
    button2: string
    func?: Function
}

interface page2Structure {
    title: string
    context: string
    button: string
    titleImage: string
    func?: Function
}