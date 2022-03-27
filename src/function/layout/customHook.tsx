import {useState} from "react";
import {FormattedMessage} from "react-intl";
import {topicSetting} from "../../setting/topicSetting";

export function useAsideHover(firstTopicIsOpen: boolean, topic: string){
    const [hoverIsActive, setHoverIsActive] = useState(false)

    let contain = null
    if(!firstTopicIsOpen && hoverIsActive) {
        contain = (
            <div className={"hoverText"}>
                <FormattedMessage id={topicSetting[topic as keyof typeof topicSetting].id}/>
            </div>
        )
    }
    return {contain, setHoverIsActive}
}