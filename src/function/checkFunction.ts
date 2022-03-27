export function checkFetchResult<T extends Response>(response: T): Promise<T> {
    return new Promise(function (resolve, reject) {
        if (response.ok) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}