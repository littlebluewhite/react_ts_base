import {Dispatch} from "react";
import {pageControlActionType, pageControlInit} from "../../generalReducer/pageControl";

export interface pageControlType {
    state: typeof pageControlInit
    dispatch: Dispatch<pageControlActionType>
    data: any
}