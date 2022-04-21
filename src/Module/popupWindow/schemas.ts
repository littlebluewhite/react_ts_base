
export enum popupStatus {
    page1,
    page2,
}

export interface popupWindowProps{
    conf: confStructure
    func1: Function
    func2: Function
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
}