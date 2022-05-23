import {pluginsStateInit} from "./pluginsReducer";
import {eventFilter, eventSearch, eventSort, getPageRange} from "../../../../generalFunction/dealDataFunction";

export function dealPluginsData(state: typeof pluginsStateInit, data: any[], langPackage: {[key: string]: string}){
    const {filter, sort, search, pagination} = state
    const filteredData = eventFilter(data, filter)
    const searchedData = eventSearch(filteredData, search, langPackage)
    const sortedData = eventSort(searchedData, sort)
    const {upNumber, downNumber} = getPageRange(pagination, data.length)
    return {
        dealData: sortedData.slice(downNumber-1, upNumber),
        metadata: {
            totalCount: sortedData.length,
            maxPage: Math.ceil(sortedData.length / pagination.pageSize),
            downNumber: downNumber,
            upNumber: upNumber
        }
    }
}