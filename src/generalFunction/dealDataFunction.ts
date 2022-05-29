import {allSelectData} from "../Module/selectModule/mergeSelect";
import {timestampToFormatTime} from "./convertFunction";
import {pageControlInit} from "../generalReducer/pageControl";

export function eventFilter(data: any[], filters: {[key: string]: string}) {
    return data.filter((datum) => {
        for (let filter in filters) {
            if (datum[filter].toString() !== filters[filter].toString() && filters[filter] !== "") {
                return false
            }
        }
        return true
    })
}

export function eventSearch(data: any[], search: string, langPackage: any = {}) {
    return data.filter((datum) => {
        for (let attr in datum) {
            if (attr+"_filter" in allSelectData) {
                const textId = (allSelectData[attr+"_filter"]["option"][allSelectData[attr+"_filter"].index[datum[attr]]]).textId
                const text = langPackage[textId] || textId
                if (text.indexOf(search.toString()) !== -1) {
                    return true
                }
            } else if ((attr === "loginTime" || attr === "time") &&
                typeof (datum[attr]) === 'number') {
                const stringTime = timestampToFormatTime(datum[attr])
                if (stringTime.indexOf(search.toString()) !== -1) {
                    return true
                }
            } else {
                if (!datum[attr]) {
                    datum[attr] = ""
                }
                if (datum[attr].toString().indexOf(search.toString()) !== -1) {
                    return true
                }
            }
        }
        return false
    })
}

export function eventSort(data: any[], sortCondition: [string, boolean]) {
    const result = []
    for (let datum of data) {
        result.push(datum)
    }
    if (sortCondition[0] === "floor") {
        result.sort((a, b) => {
            return a.floor - b.floor
        })
    } else {
        result.sort((a, b) => {
            if (a[sortCondition[0]] < b[sortCondition[0]]) {
                return -1
            } else if (b[sortCondition[0]] > a[sortCondition[0]]) {
                return 1
            }
            return 0
        })
    }
    if (sortCondition[1]) {
        result.reverse()
    }
    return result
}

export function getPageRange(pagination: typeof pageControlInit.pagination, dataLength: number){
    const downNumber = (pagination.current - 1) * pagination.pageSize + 1
    let upNumber = (pagination.current - 1) * pagination.pageSize
    dataLength - downNumber < pagination.pageSize ? upNumber += (dataLength - downNumber + 1) :
        upNumber += pagination.pageSize
    return {downNumber, upNumber}
}

interface commonStateType {
    filter: {[key: string]: string}
    sort: [string, boolean]
    search: string
    pagination: {
        current: number
        pageSize: number
        showSizeChanger: boolean
        pageSizeOptions: number[]
    }

}

export function commonDealData<T extends commonStateType>(state: T, data: any[], langPackage: {[key: string]: string}){
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