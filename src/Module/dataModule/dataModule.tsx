import {dataModuleProps, dataContainerProps, dataElementProps, clickMode} from "./schemas"
import './dataModule.css'
import { getButton } from "./function"
import { objCompare } from "./function"
import "./dataModule.css"


// use dataReducer
export function DataModule({config,data,style,state,dispatch}:dataModuleProps){
    return(
        <div className="dataModule">
            {
                data.map((row:object,index:number)=>(
                    <DataContainer key={index} config={config} row={row} style={style} state={state} dispatch={dispatch}/>
                ))
            }
        </div>
    )
}

function DataContainer({config,row,style,state,dispatch}:dataContainerProps){
    let res = getButton(config,state,row)
    
    function handleRow(){
        const payload=String(JSON.stringify(row))
        
        switch (config){
            case clickMode.close:
                break;
            case clickMode.single:
                dispatch({type: "dataModule.setSingle", payload: {[payload]:""}})
                break;
            // dispatch({type: "dataModule.setSingle", payload: [row]})
            case clickMode.multiple:
                if(objCompare(state.check,row)){
                    //有在list裡面
                    console.log("in");
                    dispatch({type: "dataModule.unsetMultiple", payload: {[payload]:""}})
                    console.log(state.check);
                    break
                }else{
                    //沒有在list裡面
                    console.log("out");
                    dispatch({type: "dataModule.setMultiple", payload: {[payload]:""}})
                    break
                }
        }        
    }
    console.log(state.check)

    return(
        <div className="dataRow" onClick={()=>handleRow()}>
            {res}
            {
                Object.values(row).map((element: string,index: number) => (
                    <DataElement key={index} element={element} style={style[index]}/>))
            }
        </div>
    )
}

function DataElement({element,style}:dataElementProps){
    
    return(
        <div className="dataElement" style={style}>
            <p>{element}</p>
        </div>
    )
}
