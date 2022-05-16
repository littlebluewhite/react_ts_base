import {useLocalStorage} from "../../generalFunction/usefulHook";
import {Navigate, useLocation} from "react-router-dom";
import {Login} from "./login";
import {fromType} from "./schemas";

// localStorage是否有token存在
function LoginIndex() {
    // console.log("login index")
    const storageToken = useLocalStorage("token", "")[0]
    const location: any = useLocation()
    const from: fromType = location?.state?.from || {pathname: "/layout"}
    const messageInit: string = location?.state?.messageInit || ""
    return (
        <>
            {storageToken ?
                <Navigate to={"/tokenLogin/" + storageToken} state={{from: from}} replace/>
                : <Login from={from} messageInit={messageInit}/>
            }
        </>
    )
}

export {LoginIndex}