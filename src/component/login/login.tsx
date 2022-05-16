import {globalSetting} from "../../setting/globalSetting";
import indexDefaultPhoto from "../../image/png/index.png"
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {LoginProps, userDefault, userType} from "./schemas";
import {fetchLogin, fetchSelfTemplate} from "./loginFetch";
import {successLogin} from "./loginFunction";
import {useNavigate} from "react-router-dom";
import "./login.css"
import {useLocalStorage} from "../../generalFunction/usefulHook";
import {useAuth} from "../../generalFunction/providerHook";


function Login({from, messageInit}: LoginProps) {
    const [user, setUser] = useState<userType>(userDefault)
    const [message, setMessage] = useState<string>(messageInit)
    const auth = useAuth()
    const navigate = useNavigate()
    const setStorageToken = useLocalStorage("token", "")[1]
    const loginSubmit = useCallback(async (event: FormEvent<HTMLFormElement>, user: userType) => {
        event.preventDefault()
        try {
            const response = await fetchLogin(user)
            const data = await response.json()
            const resultData = await successLogin(data)
            const response2 = await fetchSelfTemplate(resultData.AccountInfo.token)
            const data2 = await response2.json()
            setStorageToken(resultData.AccountInfo.token)
            auth.signIn({...resultData, ...data2}, () => {
                navigate(from.pathname, {replace: true})
            })
        } catch (e: any) {
            console.log(e)
            setMessage(e)
        }
    }, [auth, navigate, from, setStorageToken])

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>, item: string) => {
            setUser(pre => ({
                ...pre, [item]: event.target.value
            }))
        }, []
    )

    return (
        <div className={"loginContainer"}>
            <div className="imageContainer">
                {globalSetting.PHOTO_DEFAULT ?
                    <img src={indexDefaultPhoto} alt={"index"}/>
                    : <img src={`${globalSetting.SERVER}:${globalSetting.PORT}/api/IBMS/Web/V1/systemSetting/logo/index`} alt={"index"}/>
                }
            </div>
            <form onSubmit={(event) => (loginSubmit(event, user))}>
                <div className="userContainer">
                    <div className={"usernameContainer"}>
                        <input type="text" className="login_input username" value={user.username}
                               onChange={(event) => (handleChange(event, "username"))}
                               placeholder="Username" required={true}/>
                    </div>
                    <div className={"passwordContainer"}>
                        <input type="password" className="login_input password" value={user.password}
                               onChange={(event) => (handleChange(event, "password"))}
                               placeholder="Password" required={true}/>
                    </div>
                    <div className={"messageContainer"}>
                        {message}
                    </div>
                    <button className="login">Login</button>
                    <div className={"helpText"}>Any help?</div>
                    <div className={"helpText"}>Need an account?Sign Up</div>
                </div>
            </form>
        </div>)
}

export {Login}