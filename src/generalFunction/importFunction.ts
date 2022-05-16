export function importAll(r: any) {
    const data = {} as any
    r.keys().map((item: any) => ( data[item.replace('./', '')] = r(item)))
    return data
}


