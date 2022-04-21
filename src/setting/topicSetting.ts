import monitoring from "../image/svg/monitoring.svg"
import accountSetting from "../image/svg/accountSetting.svg"
import alarmSetting from "../image/svg/alarmSetting.svg"
import systemSetting from "../image/svg/systemSetting.svg"
import report from "../image/svg/report.svg"
import dashboard from "../image/svg/dashboard.svg"
import underConstruction from "../image/svg/underConstruction.svg"

const defaultData = {
    "dashboard": {
        "textId": "header.dashboard",
        "image": dashboard,
        "permission": ["Data_CRUD.ColdData_C", 1],
        "subData": {
            "mainDashboard": {
                "textId": "header.dashboard.mainDashboard",
                "permission": true,
            }
        }

    },
    "alarmMonitoring": {
        "textId": "header.alarmMonitoring",
        "image": monitoring,
        "permission": true,
        "subData": {
            "event": {
                "textId": "header.alarmMonitoring.event",
                "permission": true,
            },
            "history": {
                "textId": "header.alarmMonitoring.history",
                "permission": ["Data_CRUD.test", 1],
            }
        }
    },
    "accountSetting": {
        "textId": "header.accountSetting",
        "image": accountSetting,
        "permission": true,
        "subData": {
            "userList": {
                "textId": "header.accountSetting.userList",
                "permission": true,
                "subData": {
                    "editor": {
                        "textId": "header.accountSetting.userList.editor",
                        "permission": true,
                    },
                    "create": {
                        "textId": "header.accountSetting.userList.create",
                        "permission": true,
                    }
                }
            },
            "group": {
                "textId": "header.accountSetting.group",
                "permission": true,
            },
            "plugins": {
                "textId": "header.accountSetting.plugins",
                "permission": true,
                "subData": {
                    "editor": {
                        "textId": "header.accountSetting.plugins.editor",
                        "permission": true,
                    },
                    "create": {
                        "textId": "header.accountSetting.plugins.create",
                        "permission": true,
                    }
                }
            },
        }
    },
    "alarmSetting": {
        "textId": "header.alarmSetting",
        "image": alarmSetting,
        "permission": true,
        "subData": {
            "category": {
                "textId": "header.alarmSetting.category",
                "permission": true,
            },
            "rule": {
                "textId": "header.alarmSetting.rule",
                "permission": true,
                "subData": {
                    "edit": {
                        "textId": "header.alarmSetting.rule.edit",
                        "permission": true,
                    },
                    "create": {
                        "textId": "header.alarmSetting.rule.create",
                        "permission": true,
                    }
                }
            }
        }
    },
    "systemSetting": {
        "textId": "header.systemSetting",
        "image": systemSetting,
        "permission": true,
        "subData": {
            "url": {
                "textId": "header.systemSetting.url",
                "permission": true,
            },
            "logo": {
                "textId": "header.systemSetting.logo",
                "permission": true,
            }
        }
    },
    "report": {
        "textId": "header.report",
        "image": report,
        "permission": true,
        "subData": {
            "alarmStatistic": {
                "textId": "header.report.alarmStatistic",
                "permission": true,
            },
            "accountReport": {
                "textId": "header.report.accountReport",
                "permission": true,
            },
            "accessControlReport": {
                "textId": "header.report.accessControlReport",
                "permission": true,
            },
            "chargerReport": {
                "textId": "header.report.chargerReport",
                "permission": true,
            },
            "visitorReport": {
                "textId": "header.report.visitorReport",
                "permission": true,
            },
        }
    },
    "underConstruction": {
        "textId": "header.underConstruction",
        "image": underConstruction,
        "permission": true,
        "subData": {
            "test1": {
                "textId": "header.underConstruction.test1",
                "permission": true,
            },
            "test2": {
                "textId": "header.underConstruction.test2",
                "permission": true,
            },
            "test3": {
                "textId": "header.underConstruction.test3",
                "permission": true,
            },
        }
    },
}

export const topicSetting =
    (() => {

        try {
            return require("../projectExtra/setting/topicSetting").topicSetting || defaultData
        } catch {
            return defaultData
        }
    })()
