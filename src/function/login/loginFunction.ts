
function successLogin<T extends object>(data: T): Promise<T>{
    return new Promise(function(resolve, reject){
        if(Object.keys(data).length===0 || !data.hasOwnProperty("AccountInfo")){
            reject("error user")
        }else{
            resolve(data)
        }
    })
}

export {successLogin}