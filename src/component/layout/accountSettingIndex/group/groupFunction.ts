import {groupStateInit} from "./groupReducer";
import {eventSearch, eventSort} from "../../../../generalFunction/dealDataFunction";

export function dealGroupData(state: typeof groupStateInit){
    const {rawData, search, sort} = state
    const searchedData = eventSearch(rawData, search)
    return eventSort(searchedData, sort)
}