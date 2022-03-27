import {fetchAlarmEvent} from "../../function/layout/layoutFetch";
import alarmImage from "../../image/svg/alarmNotification.svg"
import {notificationConfig} from "../../Module/notification/schemas";

export const alarmNotification: notificationConfig = {
    api: fetchAlarmEvent,
    image: alarmImage,
    link: "/layout/alarmMonitoring/event"
}