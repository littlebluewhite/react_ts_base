import "./layout.css"
import React, {useEffect, useReducer, useState} from "react";
import {
    asideContainerProps,
    asideProps,
    asideSecondTopicProps,
    controlAsideProps,
    headerProps,
    headerSecondTopicProps,
    personalMenuProps,
    personalSettingBarProps,
    personalSettingProps,
    personalSettingSelect,
    personalStatus,
    topicDataType,
    topicEnum, upAsideElementProps
} from "./schemas";
import {globalSetting} from "../../setting/globalSetting";
import navigation from "../../image/png/navigation.png"
import {layoutReducer, layoutStateInit} from "./layoutReducer";
import {
    Link,
    LinkProps,
    Navigate,
    Route,
    Routes,
    useMatch,
    useNavigate,
    useParams,
    useResolvedPath
} from "react-router-dom";
import {topicSetting} from "../../setting/topicSetting";
import {ModuleNotify} from "../../Module/notification/notification";
import {alarmNotification} from "./moduleConfig";
import {useAuth, useLang} from "../../generalFunction/providerHook";
import {ParentModel} from "../parentComponent";
import {useAsideHover} from "./customHook";
import {checkPermission} from "./layoutFunction";
import {asideDownSetting, headerSetting, personalMenuSetting} from "../../setting/layoutSetting";
import {AccountSettingIndex} from "./accountSettingIndex/accountSettingIndex";
import {ProjectArticleIndex} from "../../projectExtra/component/articleIndex";
import { TextLanguage } from "../textComponent";
import {UnderConstructionIndex} from "./underConstruction/underConstructionIndex";

export function Layout() {
    const [state, dispatch] = useReducer(layoutReducer, layoutStateInit)
    return (
        <>
            <Header state={state} dispatch={dispatch}/>
            <div className={"articleAsideContainer"}>
                <Aside state={state} dispatch={dispatch}/>
                <Article/>
            </div>
        </>
    )
}

function Header({state, dispatch}: headerProps) {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [])

    return (
        <header>
            {headerSetting.controlAside && <ControlAsideIndex state={state} dispatch={dispatch}/>}
            {headerSetting.navigationImage && <NavigationImage/>}
            {headerSetting.headerTitle && <HeaderTitleIndex/>}
            {headerSetting.notification && <Notification/>}
            {headerSetting.userIngo && <UserInfo/>}
            {headerSetting.userIcon && <UserIcon/>}
        </header>
    )
}

function ControlAsideIndex({state, dispatch}: controlAsideProps) {
    let homeStatus: string = state.firstTopicIsOpen ? "homeOpen" : "homeClose"
    let subStatus: string = state.secondTopicIsOpen ? "subOpen" : "subClose"

    function handleAsideOpen(topic: topicEnum) {
        if (topic === topicEnum.firstTopic) {
            dispatch({type: "firstSwitch"})
        } else if (topic === topicEnum.secondTopic) {
            dispatch({type: "secondSwitch"})
        }
    }

    return (
        <Routes>
            <Route path={"/"} element={
                <div className={"controlAside"}>
                    <div className={"point svgContainer " + homeStatus}
                         onClick={() => handleAsideOpen(topicEnum.firstTopic)}/>
                </div>
            }>
            </Route>
            <Route path={"/*"} element={
                <div className={"controlAside"}>
                    <div className={"point svgContainer " + subStatus}
                         onClick={() => handleAsideOpen(topicEnum.secondTopic)}/>
                </div>
            }>
            </Route>
        </Routes>
    )
}

function NavigationImage() {
    return (
        <div className={"navigationContainer"}>
            <Link to={"/layout"}>
                {globalSetting.PHOTO_DEFAULT ?
                    <img src={navigation} alt="navigation"/>
                    : <img src={`${globalSetting.SERVER}:${globalSetting.PORT}/api/IBMS/Web/V1/systemSetting/logo/navigation`} alt="navigation"/>
                }
            </Link>
        </div>
    )
}

function HeaderTitleIndex() {
    return (
        <div className={"headerTitle"}>
            <Routes>
                <Route path={"/"} element={
                    <TextLanguage textId={"header.home"}/>
                }/>
                <Route/>
                <Route path={"/:firstTopic/*"} element={<HeaderFirstTopic/>}/>
            </Routes>
        </div>
    )
}

function HeaderFirstTopic() {
    let firstTopic: string = useParams<"firstTopic">().firstTopic || ""
    const firstTopicData: topicDataType = topicSetting[firstTopic as keyof typeof topicSetting]
    const user = useAuth().user
    const permission = checkPermission(firstTopicData.permission as [string, any] | boolean, user)
    return (
        <>
            {permission ?
                <span>
            <TextLanguage textId={firstTopicData.textId}/>
            <Routes>
                <Route path={"/:secondTopic0/*"}
                       element={<HeaderSecondTopic
                           secondData={firstTopicData.subData} count={0}
                           pathname={`/layout/${firstTopic}`}
                       />}/>
            </Routes>
        </span>
                :
                <Navigate to={"/layout"}/>}
        </>
    )
}

function HeaderSecondTopic({secondData, count, pathname}: headerSecondTopicProps) {
    let newCount: number = count + 1
    let secondTopic: string = useParams()[`secondTopic${count}`] || ""
    const user = useAuth().user
    const secondTopicData: topicDataType = secondData[secondTopic]
    const permission = checkPermission(secondTopicData.permission as [string, any] | boolean, user)
    return (
        <>
            {permission ?
                <>
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;<TextLanguage textId={secondTopicData.textId}/>
                    <Routes>
                        <Route path={`/:secondTopic${newCount}/*`}
                               element={
                                   <HeaderSecondTopic
                                       secondData={secondTopicData.subData} count={newCount}
                                       pathname={`${pathname}/${secondTopic}`}
                                   />}/>
                    </Routes>
                </>
                : <Navigate to={pathname}/>
            }
        </>
    )
}

function Notification() {
    return (
        <div className={"notification"}>
            <ModuleNotify config={alarmNotification}/>
        </div>
    )
}

function UserInfo() {
    const auth = useAuth()
    return (
        <div className={"userInfo"}>
            {`Hi, ${auth.user.AccountInfo.AccountId}`}<br/>
            {auth.user.AccountInfo.RoleGroup}
        </div>
    )
}

function UserIcon() {
    const [showModel, setShowModel] = useState<boolean>(false)
    return (
        <div className={"userIcon"}>
            {showModel &&
                <ParentModel>
                    <PersonalMenu setShowModel={setShowModel}/>
                </ParentModel>
            }
            <div className={"svgContainer userPhoto point"} onClick={() => setShowModel(true)}/>
        </div>
    )
}

function PersonalMenu(
    {
        setShowModel,
        stateInit = personalStatus.menu,
        personalSelectInit = personalSettingSelect.profile
    }: personalMenuProps) {
    const [status, setStatus] = useState<personalStatus>(stateInit)
    const navigate = useNavigate()
    const auth = useAuth()

    function closeMenu() {
        if (status === personalStatus.menu) {
            setShowModel(false)
        } else {
            return null
        }
    }

    function openSetting(event: React.MouseEvent) {
        event.stopPropagation()
        setStatus(personalStatus.personalSetting)
    }

    function logOut(event: React.MouseEvent) {
        event.stopPropagation()
        localStorage.removeItem("token")
        auth.signOut(() => {
        })
        navigate("/login")
    }

    return (
        <div className={"model"} onClick={() => closeMenu()}>
            {status === personalStatus.menu &&
                <div className={"personalMenu"}>
                    {personalMenuSetting.personalSetting &&
                        <div className={"setting"}
                             onClick={(event) => openSetting(event)}>
                            <TextLanguage textId={"model.menu.personalSetting"}/>
                        </div>
                    }
                    {personalMenuSetting.logOut &&
                        <div className={"logOut"}
                             onClick={(event) => logOut(event)}>
                            <TextLanguage textId={"model.menu.logOut"}/>
                        </div>
                    }
                </div>
            }
            {status === personalStatus.personalSetting &&
                <PersonalSetting setShowModel={setShowModel} personalSelectInit={personalSelectInit}/>
            }
        </div>
    )
}

function PersonalSetting(
    {
        setShowModel,
        personalSelectInit = personalSettingSelect.profile
    }: personalSettingProps) {

    const [select, setSelect] = useState<personalSettingSelect>(personalSelectInit)
    return (
        <div className={"personalSetting"}>
            <PersonalSettingBar select={select} setSelect={setSelect}/>
            <div className={"personalSettingArticle"}>
                <div className={"articleContainer"}>
                    {select === personalSettingSelect.profile && <Profile/>}
                    {select === personalSettingSelect.language && <SettingLanguage/>}
                </div>
            </div>
            <div className={"svgContainer closeButton pointer"} onClick={() => setShowModel(false)}/>
        </div>
    )
}

function PersonalSettingBar({select, setSelect}: personalSettingBarProps) {
    return (
        <div className={"personalSettingBar"}>
            <div className={"barContainer"}>
                <div className={"title"}>
                    <TextLanguage textId={"model.personalSetting.accountSetting"}/>
                </div>
                <div className={"content" + (select === personalSettingSelect.profile ? " active" : "")}
                     onClick={() => setSelect(personalSettingSelect.profile)}>
                    <TextLanguage textId={"model.personalSetting.profile"}/>
                </div>
                <div className={"title topic"}>
                    <TextLanguage textId={"model.personalSetting.app"}/>
                </div>
                <div className={"content" + (select === personalSettingSelect.language ? " active" : "")}
                     onClick={() => setSelect(personalSettingSelect.language)}>
                    <TextLanguage textId={"model.personalSetting.language"}/>
                </div>
            </div>
        </div>
    )
}

function Profile() {
    const auth = useAuth()
    return (
        <>
            <div className={"profileTitle"}>
                <TextLanguage textId={"model.personalSetting.basic"}/>
            </div>
            <div className={"row"}>
                <div className={"columnContainer"}>
                    <div className={"subject"}><TextLanguage textId={"model.personalSetting.username"}/></div>
                    <div className={"value"}>{auth.user.AccountInfo.AccountId}</div>
                </div>
                <div className={"columnContainer"}>
                    <div className={"subject"}><TextLanguage textId={"model.personalSetting.role"}/></div>
                    <div className={"value"}>{auth.user.AccountInfo.RoleGroup}</div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"columnContainer"}>
                    <div className={"subject"}><TextLanguage textId={"model.personalSetting.companyName"}/></div>
                    <div className={"value"}>{auth.user.AccountInfo.SubCompany}</div>
                </div>
                <div className={"columnContainer"}/>
            </div>
            <div className={"profileTitle information"}>
                <TextLanguage textId={"model.personalSetting.information"}/>
            </div>
            <div className={"row"}>
                <div className={"columnContainer"}>
                    <div className={"subject"}><TextLanguage textId={"model.personalSetting.name"}/></div>
                    <div className={"value"}>{auth.user.AccountInfo.UserInfo[0].Value}</div>
                </div>
                <div className={"columnContainer"}>
                    <div className={"subject"}><TextLanguage textId={"model.personalSetting.email"}/></div>
                    <div className={"value"}>{auth.user.AccountInfo.UserInfo[3].Value}</div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"columnContainer"}>
                    <div className={"subject"}><TextLanguage textId={"model.personalSetting.phone"}/></div>
                    <div className={"value"}>{auth.user.AccountInfo.UserInfo[2].Value}</div>
                </div>
                <div className={"columnContainer"}/>
            </div>
            <div className={"row"}>
                <div className={"addressSubject"}><TextLanguage textId={"model.personalSetting.address"}/></div>
                <div className={"addressValue"}>{auth.user.AccountInfo.UserInfo[1].Value}</div>
            </div>
        </>
    )
}

function SettingLanguage() {
    const language = useLang()

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        language.setLang(event.currentTarget.value)
    }

    return (
        <>
            <div className={"languageTopic"}>
                <TextLanguage textId={"model.personalSetting.selectLang"}/>
            </div>
            <label htmlFor="en_us">
                <div className={"language"}>
                    <input type="radio" name={"language"} value={"en_us"} checked={language.lang === "en_us"}
                           onChange={event => handleChange(event)} id={"en_us"}/>
                    <TextLanguage textId={"model.personalSetting.en_us"}/>
                </div>
            </label>
            <label htmlFor="zh_tw">
                <div className={"language"}>
                    <input type="radio" name={"language"} value={"zh_tw"} checked={language.lang === "zh_tw"}
                           onChange={event => handleChange(event)} id={"zh_tw"}/>
                    <TextLanguage textId={"model.personalSetting.zh_tw"}/>
                </div>
            </label>
            <label htmlFor="zh_cn">
                <div className={"language"}>
                    <input type="radio" name={"language"} value={"zh_cn"} checked={language.lang === "zh_cn"}
                           onChange={event => handleChange(event)} id={"zh_cn"}/>
                    <TextLanguage textId={"model.personalSetting.zh_cn"}/>
                </div>
            </label>
        </>
    )
}

function Aside({state, dispatch}: asideProps) {
    return (
        <>
            <aside>
                <UpAside state={state}/>
                <DownAside state={state}/>
            </aside>
            <Routes>
                <Route path={"/:firstTopic/*"} element={<AsideSecondTopic state={state} dispatch={dispatch}/>}/>
            </Routes>
        </>
    )
}

function UpAside({state}: asideContainerProps) {
    return (
        <div className={"upAside"}>
            {Object.keys(topicSetting).map((item, index) => (
                <UpAsideElement key={index} topic={item} firstTopicIsOpen={state.firstTopicIsOpen}/>
            ))}
        </div>
    )
}

function UpAsideElement({topic, firstTopicIsOpen}: upAsideElementProps) {
    const {contain, setHoverIsActive} = useAsideHover(firstTopicIsOpen, topic)
    const user = useAuth().user
    const permission = checkPermission(topicSetting[topic as keyof typeof topicSetting].permission as ([string, any] | boolean), user)
    return (
        <>
            {permission &&
                <div className={"asideUpItem"} onMouseEnter={() => setHoverIsActive(true)}
                     onMouseLeave={() => setHoverIsActive(false)}>
                    <Link
                        to={`/layout/${topic}/` + Object.keys(topicSetting[topic as keyof typeof topicSetting].subData)[0]}>
                        <div className={"itemContainer"}>
                            <Routes>
                                <Route path={`/${topic}/*`} element={
                                    <div className={"activeBackground"}/>
                                }/>
                            </Routes>
                            <div className={"hoverBackground"}/>
                            <div className={"svgContainer asideUpImage"}
                                 style={{backgroundImage: `url(${topicSetting[topic as keyof typeof topicSetting].image})`}}>
                            </div>
                            {firstTopicIsOpen ? (<div className={"text"}>
                                <TextLanguage textId={topicSetting[topic as keyof typeof topicSetting].textId}/>
                            </div>) : null}
                        </div>
                    </Link>
                    {contain}
                </div>
            }
        </>
    )
}

function DownAside({state}: asideContainerProps) {
    return (
        <div className={"downAside"}>
            {asideDownSetting.language && <Language firstTopicIsOpen={state.firstTopicIsOpen}/>}
            {asideDownSetting.privacy && <Privacy firstTopicIsOpen={state.firstTopicIsOpen}/>}
            {asideDownSetting.terms && <Terms firstTopicIsOpen={state.firstTopicIsOpen}/>}
            {asideDownSetting.contact && <Contact firstTopicIsOpen={state.firstTopicIsOpen}/>}
        </div>
    )
}

function Language({firstTopicIsOpen}: { firstTopicIsOpen: boolean }) {
    const [showModel, setShowModel] = useState<boolean>(false)

    return (
        <>
            <div className={"asideDownItem pointer"} onClick={() => setShowModel(true)}>
                <div className={"svgContainer language"}/>
                {firstTopicIsOpen ? (<div className={"asideDownText"}>
                    <TextLanguage textId={"aside.down.lang"}/></div>) : null}
            </div>
            {showModel &&
                <ParentModel>
                    <PersonalMenu setShowModel={setShowModel}
                                  stateInit={personalStatus.personalSetting}
                                  personalSelectInit={personalSettingSelect.language}
                    />
                </ParentModel>
            }
        </>
    )
}

function Privacy({firstTopicIsOpen}: { firstTopicIsOpen: boolean }) {
    return (
        <div className={"asideDownItem"}>
            <div className={"svgContainer privacy"}/>
            {firstTopicIsOpen ? (<div className={"asideDownText"}>
                <TextLanguage textId={"aside.down.privacy"}/></div>) : null}
        </div>
    )
}

function Terms({firstTopicIsOpen}: { firstTopicIsOpen: boolean }) {
    return (
        <div className={"asideDownItem"}>
            <div className={"svgContainer terms"}/>
            {firstTopicIsOpen ? (<div className={"asideDownText"}>
                <TextLanguage textId={"aside.down.terms"}/></div>) : null}
        </div>
    )
}

function Contact({firstTopicIsOpen}: { firstTopicIsOpen: boolean }) {
    return (
        <div className={"asideDownItem pointer"}>
            <div className={"svgContainer contact"}/>
            {firstTopicIsOpen ? (<div className={"asideDownText"}>
                <TextLanguage textId={"aside.down.contact"}/></div>) : null}
        </div>
    )
}

function AsideSecondTopic({state, dispatch}: asideSecondTopicProps) {
    const {firstTopic} = useParams()
    const [itemOpen, setItemOpen] = useState<boolean>(true)
    const secondTopicData = topicSetting[firstTopic as keyof typeof topicSetting].subData
    const user = useAuth().user

    useEffect(() => {
        dispatch({
            type: "firstClose"
        })
        dispatch({
            type: "secondOpen"
        })
        return () => {
            dispatch({
                type: "firstOpen"
            })
        }
    }, [dispatch])

    return (
        <>
            {state.secondTopicIsOpen &&
                <div className={"asideSecondTopic"}>
                    <div className={"block"}/>
                    <div className={"controlContainer"}>
                        <div className={"firstTopic"}>
                            <TextLanguage textId={topicSetting[firstTopic as keyof typeof topicSetting].textId}/>
                        </div>
                        <div className={itemOpen ? "arrow up active pointer" : "arrow down active pointer"}
                             onClick={() => setItemOpen(pre => !pre)}/>
                    </div>
                    {itemOpen &&
                        (Object.keys(secondTopicData).map((item, index) => (
                            checkPermission((secondTopicData[item as keyof typeof secondTopicData] as any).permission, user) &&
                            <SecondTopicLink key={index} to={`/layout/${firstTopic}/${item}`}>
                                <TextLanguage
                                    textId={(secondTopicData[item as keyof typeof secondTopicData] as { textId: string }).textId}/>
                            </SecondTopicLink>
                        )))}
                </div>
            }
        </>
    )
}

function SecondTopicLink({children, to, ...props}: LinkProps) {
    const resolved = useResolvedPath(to)
    const match = useMatch({path: resolved.pathname + "/*"})
    return (
        <Link to={to} {...props}>
            <div className={"secondTopicLink" + (match ? " active" : "")}>
                {children}
                <div className={"hoverBackground"}/>
            </div>
        </Link>
    )
}

function Article() {
    return (
        <article>
            <div className={"articleContainer"}>
                <div className={"articleContent"}>
                    <Routes>
                        <Route path={"accountSetting/*"} element={<AccountSettingIndex/>}/>
                        <Route path={"underConstruction/*"} element={<UnderConstructionIndex/>}/>
                        <Route path={"*"} element={<ProjectArticleIndex/>}/>
                    </Routes>
                </div>
            </div>
        </article>
    )
}