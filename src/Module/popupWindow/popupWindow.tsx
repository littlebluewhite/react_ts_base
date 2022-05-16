import './popupWindow.css'
import {popupStatus, popupWindow1Params, popupWindow2Params, popupWindow3Params} from "./schemas"
import {ParentModel} from "../../component/parentComponent"
import React, {useState} from 'react'
import {TextLanguage} from '../../component/textComponent'


// params example
// const params = {
//     config: {
//             'page1':{
//                 'title': 'popupWindow.save1.title',
//                 'button1':'popupWindow.save1.button1',
//                 'button2':'popupWindow.save1.button2',
//             },
//     },
//     func1?: ()=>console.log(1),
// }
export function usePopupWindow1(  // only page2
    {config, func1 = () => {}}: popupWindow1Params) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    function handlePage1() {
        func1()
        setIsOpen(false)
    }
    const component = (isOpen &&
        <ParentModel>
            <div className='model'>
                <div className={"model"}>
                    <div className="page1">
                        <div className="head">
                            <TextLanguage textId={config.page1.title}/>
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
    {config, func2 = () => {}}: popupWindow2Params) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)

    function handlePage2() {
        func2()
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
                            <TextLanguage textId={config.page2.context}/>
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
//     config: {
//             'page1':{
//                 'title': 'popupWindow.save1.title',
//                 'button1':'popupWindow.save1.button1',
//                 'button2':'popupWindow.save1.button2',
//             },
//             'page2':{
//                 'title': 'popupWindow.save2.title',
//                 'context': 'popupWindow.save2.context',
//                 'button': 'popupWindow.save2.button',
//                 'titleImage': saveIcon,
//             }
//     },
//     func1?: ()=>console.log(1),
//     func2?: ()=>console.log(2)
// }
export function usePopupWindow3(  // two windows
    {config, func1 = () => {}, func2 = () => {}}: popupWindow3Params) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [status, setStatus] = useState<popupStatus>(popupStatus.page1)

    function handlePage1() {
        func1()
        setStatus(popupStatus.page2)
    }

    function handlePage2() {
        func2()
        setIsOpen(false)
    }

    const content1 = (
        <div className={"model"}>
            <div className="page1">
                <div className="head">
                    <TextLanguage textId={config.page1.title}/>
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
                    <TextLanguage textId={config.page2.context}/>
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

