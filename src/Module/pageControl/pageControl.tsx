import {FormattedMessage} from "react-intl";
import {pageControlType} from "./schemas";
import "./pageControl.css"

export function PageControl({state, dispatch, data}: pageControlType) {
    console.log(state)

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
                <FormattedMessage id={"page.row1"}/> {data?.metadata?.totalCount}
                <FormattedMessage id={"page.row2"}/>
            </div>
        </div>
    )
}