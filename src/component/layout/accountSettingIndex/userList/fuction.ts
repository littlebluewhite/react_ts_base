import {userListStateInit} from "./userListReducer";
import {
    commonDealData
} from "../../../../generalFunction/dealDataFunction";

export function dealUserListData(state: typeof userListStateInit, data: any[], langPackage: {[key: string]: string}){
    return commonDealData(state, data, langPackage)
}