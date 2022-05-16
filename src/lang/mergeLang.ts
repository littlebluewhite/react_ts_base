import {importAll} from "../generalFunction/importFunction";

function langMerge(lang: string) {
    let result = {}
    let productData
    let projectData
    switch (lang) {
        case "en_us":
            // @ts-ignore
            productData = importAll(require.context("./en_us", false, /\.ts$/))
            // @ts-ignore
            projectData = importAll(require.context("../projectExtra/lang/en_us", false, /\.ts$/))
            break
        case "zh_tw":
            // @ts-ignore
            productData = importAll(require.context("./zh_tw", false, /\.ts$/))
            // @ts-ignore
            projectData = importAll(require.context("../projectExtra/lang/zh_tw", false, /\.ts$/))
            break
        case "zh_cn":
            // @ts-ignore
            productData = importAll(require.context("./zh_cn", false, /\.ts$/))
            // @ts-ignore
            projectData = importAll(require.context("../projectExtra/lang/zh_cn", false, /\.ts$/))
            break
    }
    for (let i in productData) {
        for (let j in productData[i]) {
            result = {...result, ...productData[i][j]}
        }
    }
    for (let i in projectData) {
        for (let j in projectData[i]) {
            result = {...result, ...projectData[i][j]}
        }
    }
    return result
}

export const en_us = langMerge("en_us")

export const zh_tw = langMerge("zh_tw")

export const zh_cn = langMerge("zh_cn")
