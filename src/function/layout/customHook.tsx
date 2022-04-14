import {useState} from "react";
import { TextLanguage } from "../../component/textComponent";
import {topicSetting} from "../../setting/topicSetting";

export function useAsideHover(firstTopicIsOpen: boolean, topic: string){
    const [hoverIsActive, setHoverIsActive] = useState(false)

    let contain = null
    if(!firstTopicIsOpen && hoverIsActive) {
        contain = (
            <div className={"hoverText"}>
                <TextLanguage textId={topicSetting[topic as keyof typeof topicSetting].textId}/>
            </div>
        )
    }
    return {contain, setHoverIsActive}
}