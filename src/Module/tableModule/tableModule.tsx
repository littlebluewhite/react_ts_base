import { SortModule } from "../sortModule/sortModule"
import { DataModule } from "../dataModule/dataModule"
import { tableProps } from "./schemas"
import './tableModule.css'
import { getStyle } from "./package"

export function TableModule({config, data,sortState,sortDispatch,dataState,dataDispatch}:tableProps){
    const style=getStyle(config.sortData.field)

    return(
        <div className="tableModule">
            <SortModule config={config.sortData} state={sortState} dispatch={sortDispatch}/>
            <DataModule config={config.selectButton} data={data} style={style} state={dataState} dispatch={dataDispatch}/>
        </div>
    )
}