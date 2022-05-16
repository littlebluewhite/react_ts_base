import {defaultAdmin} from "../../generalData/defaultAdmin";

export function checkPermission(permission: [string, any] | boolean, user: typeof defaultAdmin): boolean{
    if(typeof(permission)==="boolean"){
        return permission
    }else{
        const targetList = permission[0].split(".")
        let target = user?.Template?.Template as any
        for (let column of targetList){
            target = target[column as keyof typeof target]
            if(!target){
                return false
            }
        }
        return target === permission[1];
    }
}