// when "on" of "off" circle hover show data
export function hoverData(type:any, field:any, isHover:any, hoverList:any) {
    if (!isHover[type][field]) {
        return null
    } else {
        const list = hoverList[type][field]
        return (
            <>
                <div className={"hoverData"}>
                    {list.map((item:any, index:number) => (
                        <div className={"rowContainer"} key={index}>
                            <div className={type+" colorBox"}/>
                            <div className={"text"}>{type}:</div>
                            <div className={"text"}>{item}</div>
                        </div>
                    ))}
                </div>
                <div className={"triangle"}/>
            </>
        )
    }
}