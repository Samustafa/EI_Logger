import browser from "webextension-polyfill";
import {startListening} from "@pages/background/Listners";
import {BadgeText} from "@pages/popup/Types";
import {dataBase} from "@pages/popup/database";
import {loggingConstants} from "@pages/background/LoggingConstants";

export async function initializeBackground() {
    browser.runtime.onInstalled.addListener(() => setBadgeText('OFF'));
    await initializeLoggingConstants();
    startListening();
}

async function initializeLoggingConstants() {
    dataBase.getLoggingConstants()
        .then((response) => loggingConstants.setUserIdAndStudyId(response.userId, response.studyId))
        .catch((err) => console.log("Couldn't initialize LoggingConstants", err));

}

export function setBadgeText(badgeText: BadgeText) {
    browser.action.setBadgeText({text: badgeText}).then(() => console.log("set badge to", badgeText));
}

//look again at the original files

