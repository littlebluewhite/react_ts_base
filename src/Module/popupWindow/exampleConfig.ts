import saveIcon from "./images/saveIcon.svg"
import deleteModel from "./images/deleteModel.svg"
import {popupWindow1Config, popupWindow2Config, popupWindow3Config} from "./schemas";

// popupWindow3
export const saveConfig: popupWindow3Config = {
    'page1': {
        'title': 'popupWindow.save1.title',
        'button1': 'popupWindow.save1.button1',
        'button2': 'popupWindow.save1.button2',
    },
    'page2': {
        'title': 'popupWindow.save2.title',
        'context': 'popupWindow.save2.context',
        'button': 'popupWindow.save2.button',
        'titleImage': saveIcon,
    }
}

// popupWindow1
export const cancelConfig: popupWindow1Config = {
    'page1': {
        'title': 'popupWindow.cancel1.title',
        'button1': 'popupWindow.cancel1.button1',
        'button2': 'popupWindow.cancel1.button2',
    }
}

// popupWindow2
export const saveConfig2: popupWindow2Config = {
    'page2': {
        'title': 'popupWindow.save2.title',
        'context': 'popupWindow.save2.context',
        'button': 'popupWindow.save2.button',
        'titleImage': saveIcon,
    }
}

export const deletePlugins = {
    'page1': {
        'title': 'popupWindow.deletePlugins.title',
        'button1': 'no',
        'button2': 'yes',
    },
    'page2': {
        'title': 'popupWindow.deleteSuccessful',
        'context': 'popupWindow.deletePlugins.context',
        'button': 'button.continue',
        'titleImage': deleteModel,
    }
}

export const deleteUserList = {
    'page1': {
        'title': 'popupWindow.save1.title',
        'button1': 'popupWindow.save1.button1',
        'button2': 'popupWindow.save1.button2',
    },
    'page2': {
        'title': 'popupWindow.save2.title',
        'context': 'popupWindow.',
        'button': 'continue',
        'titleImage': deleteModel,
    }
}