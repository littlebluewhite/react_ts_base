import {useLang} from "../function/generalHook/providerHook";

export function TextLanguage({textId}: {textId: string}){
    const langPackage = useLang().langPackage
    return langPackage[textId] || "not found"
}