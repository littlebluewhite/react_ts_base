import './popupWindow.css'
import {popupStatus, popupWindow1Config, popupWindow2Config, popupWindow3Config} from "./schemas"
import {ParentModel} from "../../component/parentComponent"
import React, {useState} from 'react'
import {TextLanguage} from '../../component/textComponent'


// params example
// const params = {
//     config: {
//             'page1':{
//                 'title': 'popupWindow.save1.title',
//                 'checkKey': '',
//                 'button1':'popupWindow.save1.button1',
//                 'button2':'popupWindow.save1.button2',
//             },
//     },
//     func1?: ()=>console.log(1),
// }
export function usePopupWindow1(  // only page2
    config: popupWindow1Config) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    async function handlePage1() {
        try{
            if (config.page1.func){
                await config.page1.func()
            }
            setIsOpen(false)
        }catch (e: any) {
            alert(e)
            console.log(e)
        }
    }
    const component = (isOpen &&
        <ParentModel>
            <div className='model'>
                <div className={"model"}>
                    <div className="page1">
                        <div className="head">
                            <div className={"text"}>
                                <TextLanguage textId={config.page1.title}/>
                                {config.page1.checkKey}
                            </div>
                        </div>
                        <div className="body">
                            <button onClick={() => setIsOpen(false)}><TextLanguage textId={config.page1.button1}/>
                            </button>
                            <button onClick={() => handlePage1()}><TextLanguage textId={config.page1.button2}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </ParentModel>
    )

    return [component, setIsOpen] as [JSX.Element ,React.Dispatch<React.SetStateAction<Boolean>>]
}


// params example
// const params = {
//     config: {
//             'page2':{
//                 'title': 'popupWindow.save2.title',
//                 'context': 'popupWindow.save2.context',
//                 'button': 'popupWindow.save2.button',
//                 'titleImage': saveIcon,
//             }
//     },
//     func2?: ()=>console.log(2)
// }
export function usePopupWindow2(  // only page2
    config: popupWindow2Config) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    async function handlePage2() {
        if (config.page2.func){
            await config.page2.func()
        }
        setIsOpen(false)
    }

    const component = (isOpen &&
        <ParentModel>
            <div className='model'>
                <div className={"model"}>
                    <div className="page2">
                        <div className="head">
                            <img src={config.page2.titleImage} alt=""/>
                            <TextLanguage textId={config.page2.title}/>
                        </div>
                        <div className="body">
                            <div className={"text"}>
                                <TextLanguage textId={config.page2.context}/>
                            </div>
                            <button onClick={() => handlePage2()}><TextLanguage textId={config.page2.button}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </ParentModel>
    )

    return [component, setIsOpen] as [JSX.Element ,React.Dispatch<React.SetStateAction<Boolean>>]
}

// params example
// const params = {
//     'page1':{
//         'title': 'popupWindow.save1.title',
//         'checkKey': '',
//         'button1':'popupWindow.save1.button1',
//         'button2':'popupWindow.save1.button2',
//         func?: ()=>console.log(1),
//     },
//     'page2':{
//         'title': 'popupWindow.save2.title',
//         'context': 'popupWindow.save2.context',
//         'button': 'popupWindow.save2.button',
//         'titleImage': saveIcon,
//         func?: ()=>console.log(2)
//     }
// }
export function usePopupWindow3(  // two windows
    config: popupWindow3Config) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [status, setStatus] = useState<popupStatus>(popupStatus.page1)

    async function handlePage1() {
        try{
            if (config.page1.func){
                await config.page1.func()
            }
            setStatus(popupStatus.page2)
        }catch (e: any) {
            console.log(e)
            alert(Object.values(await e.json())[0])
        }
    }

    async function handlePage2() {
        try{
            if(config.page2.func){
                await config.page2.func()
            }
            setStatus(popupStatus.page1)
            setIsOpen(false)
        }catch (e: any){
            alert(Object.values(await e.json())[0])
        }
    }

    const content1 = (
        <div className={"model"}>
            <div className="page1">
                <div className="head">
                    <div className={"text"}>
                        <TextLanguage textId={config.page1.title}/>
                        {config.page1.checkKey}
                    </div>
                </div>
                <div className="body">
                    <button onClick={() => setIsOpen(false)}><TextLanguage textId={config.page1.button1}/></button>
                    <button onClick={() => handlePage1()}><TextLanguage textId={config.page1.button2}/></button>
                </div>
            </div>
        </div>
    )


    const content2 = (
        <div className={"model"}>
            <div className="page2">
                <div className="head">
                    <img src={config.page2.titleImage} alt=""/>
                    <TextLanguage textId={config.page2.title}/>
                </div>
                <div className="body">
                    <div className={"text"}>
                        <TextLanguage textId={config.page2.context}/>
                    </div>
                    <button onClick={() => handlePage2()}><TextLanguage textId={config.page2.button}/></button>
                </div>
            </div>
        </div>
    )

    const component = (isOpen &&
        <ParentModel>
            <div className='model'>
                {status === popupStatus.page1 && content1}
                {status === popupStatus.page2 && content2}
            </div>
        </ParentModel>
    )

    return [component, setIsOpen] as [JSX.Element ,React.Dispatch<React.SetStateAction<Boolean>>]
}

