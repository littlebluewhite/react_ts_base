export function deepCopy<T>(data: T): T{
    if(Array.isArray(data)){
        return handleArray(data)
    }else if(typeof(data)==="object"){
        return handleDict(data)
    }else{
        return data
    }
}

function handleArray(data: any): any{
    let result = []
    for(let datum of data){
        result.push(deepCopy(datum))
    }
    return result
}

function handleDict<T>(data: T): T{
    let result = {...data}
    for(let key in data){
        result[key] = deepCopy(data[key])
    }
    return result
}