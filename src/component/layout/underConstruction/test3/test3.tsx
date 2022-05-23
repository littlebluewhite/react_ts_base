import {TableModule} from '../../../../Module/tableModule/tableModule'
import {useReducer} from "react"
import {sortInit, sortReducer} from "../../../../generalReducer/sortModule";
import {dataInit, dataReducer} from "../../../../generalReducer/dataReducer";
import {clickMode} from "../../../../Module/dataModule/schemas";

export function Test3() {
    const [sortState, sortDispatch] = useReducer(sortReducer, sortInit)
    const [dataState, dataDispatch] = useReducer(dataReducer, dataInit)


    const config = {
        selectButton: clickMode.single,
        sortData: {
            field: [
                {title: "sortCondition.title.time", width: '20%'},
                {title: "sortCondition.title.floor", width: '20%'},
                {title: "sortCondition.title.alarm", width: '35%'},
                {title: "sortCondition.title.state", width: '25%'},
            ]
        }
    }
    const data = [
        {"time": "2021-01-03 23:22:44", "floor": "1F_TW", "alarm": "PAU_B1_1_EA 空调箱故障跳脱", "state": "已解决"},
        {"time": "2021-01-03 23:22:45", "floor": "2F_TW", "alarm": "PAU_B1_1_EA 空调箱故障跳脱", "state": "已解决"},
        {"time": "2021-01-03 23:22:45", "floor": "3F_TW", "alarm": "PAU_B1_1_EA 空调箱故障跳脱", "state": "已解决"},
        {"time": "2021-01-03 23:22:45", "floor": "4F_TW", "alarm": "PAU_B1_1_EA 空调箱故障跳脱", "state": "已解决"},
    ]
    return (
        <>
            <TableModule config={config} data={data} sortState={sortState} sortDispatch={sortDispatch}
                         dataState={dataState} dataDispatch={dataDispatch}/>
        </>
    )
}