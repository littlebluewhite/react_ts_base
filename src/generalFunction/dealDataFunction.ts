import {allSelectData} from "../Module/selectModule/mergeSelect";
import {timestampToFormatTime} from "./convertFunction";
import {pageControlInit} from "../generalReducer/pageControl";

export function eventFilter(data: any[], filters: {[key: string]: string}) {
    return data.filter((datum) => {
        for (let filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                if (datum[filter].toString() !== filters[filter].toString() && filters[filter] !== "") {
                    return false
                }
            }
        }
        return true
    })
}

export function eventSearch(data: any[], search: string, langPackage: any = {}) {
    return data.filter((datum) => {
        for (let attr in datum) {
            if (attr in allSelectData && datum.hasOwnProperty(attr)) {
                if (langPackage[allSelectData[attr]["option"][allSelectData[attr].index[datum[attr]]].textId].indexOf(search.toString()) !== -1) {
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