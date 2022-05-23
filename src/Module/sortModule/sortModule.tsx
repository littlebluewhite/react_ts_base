import './sortModule.css'
import {sortModuleProps, sortConfigType, sortElementProps} from './schemas'
import {TextLanguage} from "../../component/textComponent"

// config example
// const config = [
//     {textId: "sortModule.title.time", style: {width: '20%'}, block: "1rem"},
//     {textId: "sortModule.title.floor", style: {width: '20%'}, block: "1rem"},
//     {textId: "sortModule.title.alarm", style: {width: '35%'}, block: "1rem"},
//     {textId: "sortModule.title.state", style: {width: '25%'}, block: "1rem"}
// ]

// lang use sortModule

// reducer use sortModule
export function SortModule({config, state, dispatch}: sortModuleProps) {
    return (
        <div className="sortModule">
            <div className={"block"} style={{width: config.block || 0}}/>
            {config.field.map((item: sortConfigType) => (
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
        <div className='SortElement' style={{width: item.width}} onClick={() => handleSort(item.title)}>
            <div className={"block"} style={{width: item.block || "0"}}/>
            <TextLanguage textId={"sortModule.title."+item.title}/>
            <div className='sortArrow'>
                <div className={`triangle triangleUp ${state.sort[0] === item.title && !state.sort[1] && "active"}`}/>
                <div className={`triangle triangleDown ${state.sort[0] === item.title && state.sort[1] && "active"}`}/>
            </div>
        </div>
    )
}