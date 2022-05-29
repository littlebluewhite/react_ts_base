import {pluginsStateInit} from "./pluginsReducer";
import {
    commonDealData
} from "../../../../generalFunction/dealDataFunction";

export function dealPluginsData(state: typeof pluginsStateInit, data: any[], langPackage: {[key: string]: string}){
    return commonDealData(state, data, langPackage)
}