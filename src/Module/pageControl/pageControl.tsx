import {pageControlType} from "./schemas";
import "./pageControl.css"
import { TextLanguage } from "../../component/textComponent";

// use generalReducer "pageControl"
export function PageControl({state, dispatch, data}: pageControlType) {

    function toPreviousPage() {
        if (state.current === 1) {
            return
        } else {
            dispatch({
                type: "pageControl.setCurrent",
                payload: state.current - 1
            })
        }
    }

    function toNextPage() {
        if (state.current >= data?.metadata?.maxPage) {
            return
        } else {
            dispatch({
                type: "pageControl.setCurrent",
                payload: state.current + 1
            })
        }
    }

    return (
        <div className={"pageControl"}>
            <div className={"pageControlButton"}>
                <div className={"arrowContainer" + (state.current === 1 ? "" : " active")}
                     onClick={() => toPreviousPage()}>
                    <div className={"arrow left" + (state.current === 1 ? "" : " active")}/>
                </div>
                <div className={"arrowContainer" + (state.current >= data?.metadata?.maxPage ? "" : " active")}
                     onClick={() => toNextPage()}>
                    <div className={"arrow right" + (state.current >= data?.metadata?.maxPage ? "" : " active")}/>
                </div>
            </div>
            <div className={"pageControlText"}>{data?.metadata?.downNumber} — {data?.metadata?.upNumber}
                <TextLanguage textId={"page.row1"}/> {data?.metadata?.totalCount}
                <TextLanguage textId={"page.row2"}/>
            </div>
        </div>
    )
}