import './sortModule.css'
import {sortModuleProps, sortConfigType, sortElementProps} from './schemas'
import {TextLanguage} from "../../component/textComponent"

// config example
// const config = [
//     {textId: "sortModule.title.time", style: {width: '20%'}},
//     {textId: "sortModule.title.floor", style: {width: '20%'}},
//     {textId: "sortModule.title.alarm", style: {width: '35%'}},
//     {textId: "sortModule.title.state", style: {width: '25%'}}
// ]

// lang use sortModule

// reducer use sortModule
export function SortModule({config, state, dispatch}: sortModuleProps) {
    return (
        <div className="sortModule">
            {config.map((item: sortConfigType) => (
                <SortElement key={item.title} item={item} state={state} dispatch={dispatch}/>
            ))}
        </div>
    )
}

function SortElement({item, state, dispatch}: sortElementProps) {
    function handleSort(title: string) {
        const isReverse = state.sort[0] === item.title ? !state.sort[1] : false
        dispatch({type: "sortModule.setSort", payload: [title, isReverse]})
    }

    return (
        <div className='SortElement' style={item.style} onClick={() => handleSort(item.title)}>
            <TextLanguage textId={"sortModule.title."+item.title}/>
            <div className='sortArrow'>
                <div className={`triangle triangleUp ${state.sort[0] === item.title && !state.sort[1] && "active"}`}/>
                <div className={`triangle triangleDown ${state.sort[0] === item.title && state.sort[1] && "active"}`}/>
            </div>
        </div>
    )
}