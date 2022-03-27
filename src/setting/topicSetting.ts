import monitoring from "../image/svg/monitoring.svg"
import accountSetting from "../image/svg/accountSetting.svg"
import alarmSetting from "../image/svg/alarmSetting.svg"
import systemSetting from "../image/svg/systemSetting.svg"
import report from "../image/svg/report.svg"
import dashboard from "../image/svg/dashboard.svg"

const defaultData = {
    "dashboard": {
        "id": "header.dashboard",
        "image": dashboard,
        "permission": ["Data_CRUD.ColdData_C", 1],
        "subData": {
            "mainDashboard": {
                "id": "header.dashboard.mainDashboard",
                "permission": true,
            }
        }

    },
    "alarmMonitoring": {
        "id": "header.alarmMonitoring",
        "image": monitoring,
        "permission": true,
        "subData": {
            "event": {
                "id": "header.alarmMonitoring.event",
                "permission": true,
            },
            "history": {
                "id": "header.alarmMonitoring.history",
                "permission": ["Data_CRUD.test", 1],
            }
        }
    },
    "accountSetting": {
        "id": "header.accountSetting",
        "image": accountSetting,
        "permission": true,
        "subData": {
            "userList": {
                "id": "header.accountSetting.userList",
                "permission": true,
                "subData": {
                    "editor": {
                        "id": "header.accountSetting.userList.editor",
                        "permission": true,
                    },
                    "create": {
                        "id": "header.accountSetting.userList.create",
                        "permission": true,
                    }
                }
            },
            "group": {
                "id": "header.accountSetting.group",
                "permission": true,
            },
            "plugins": {
                "id": "header.accountSetting.plugins",
                "permission": true,
                "subData": {
                    "editor": {
                        "id": "header.accountSetting.plugins.editor",
                        "permission": true,
                    },
                    "create": {
                        "id": "header.accountSetting.plugins.create",
                        "permission": true,
                    }
                }
            },
        }
    },
    "alarmSetting": {
        "id": "header.alarmSetting",
        "image": alarmSetting,
        "permission": true,
        "subData": {
            "category": {
                "id": "header.alarmSetting.category",
                "permission": true,
            },
            "rule": {
                "id": "header.alarmSetting.rule",
                "permission": true,
                "subData": {
                    "edit": {
                        "id": "header.alarmSetting.rule.edit",
                        "permission": true,
                    },
                    "create": {
                        "id": "header.alarmSetting.rule.create",
                        "permission": true,
                    }
                }
            }
        }
    },
    "systemSetting": {
        "id": "header.systemSetting",
        "image": systemSetting,
        "permission": true,
        "subData": {
            "url": {
                "id": "header.systemSetting.url",
                "permission": true,
            },
            "logo": {
                "id": "header.systemSetting.logo",
                "permission": true,
            }
        }
    },
    "report": {
        "id": "header.report",
        "image": report,
        "permission": true,
        "subData": {
            "alarmStatistic": {
                "id": "header.report.alarmStatistic",
                "permission": true,
            },
            "accountReport": {
                "id": "header.report.accountReport",
                "permission": true,
            },
            "accessControlReport": {
                "id": "header.report.accessControlReport",
                "permission": true,
            },
            "chargerReport": {
                "id": "header.report.chargerReport",
                "permission": true,
            },
            "visitorReport": {
                "id": "header.report.visitorReport",
                "permission": true,
            },
        }
    }
}

export const topicSetting =
    (() => {

        try {
            return require("../projectExtra/setting/topicSetting").topicSetting || defaultData
        } catch {
            return defaultData
        }
    })()
