import {pageControlType} from "./schemas";
import "./pageControl.css"
import { TextLanguage } from "../../component/textComponent";

// use generalReducer "pageControl"
export function PageControl({state, dispatch, data, additionalFunc=()=>{}}: pageControlType) {

    function toPreviousPage() {
        if (state.pagination.current === 1) {
            return
        } else {
            additionalFunc()
            dispatch({
                type: "pageControl.setCurrent",
                payload: state.pagination.current - 1
            })
        }
    }

    function toNextPage() {
        if (state.pagination.current >= data?.metadata?.maxPage) {
            return
        } else {
            additionalFunc()
            dispatch({
                type: "pageControl.setCurrent",
                payload: state.pagination.current + 1
            })
        }
    }

    return (
        <div className={"pageControl"}>
            <div className={"pageControlButton"}>
                <div className={"arrowContainer" + (state.pagination.current === 1 ? "" : " active")}
                     onClick={() => toPreviousPage()}>
                    <div className={"arrow left" + (state.pagination.current === 1 ? "" : " active")}/>
                </div>
                <div className={"arrowContainer" + (state.pagination.current >= data?.metadata?.maxPage ? "" : " active")}
                     onClick={() => toNextPage()}>
                    <div className={"arrow right" + (state.pagination.current >= data?.metadata?.maxPage ? "" : " active")}/>
                </div>
            </div>
            <div className={"pageControlText"}>{data?.metadata?.downNumber} — {data?.metadata?.upNumber}
                &nbsp;
                <TextLanguage textId={"page.row1"}/> {data?.metadata?.totalCount}&nbsp;
                <TextLanguage textId={"page.row2"}/>
            </div>
        </div>
    )
}