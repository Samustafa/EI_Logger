import browser from "webextension-polyfill";
import {startListening} from "@pages/background/Listners";
import {BadgeText} from "@pages/popup/Types";

export async function initializeBackground() {
    browser.runtime.onInstalled.addListener(() => setBadgeText('OFF'));
    startListening();
}

export function setBadgeText(badgeText: BadgeText) {
    browser.action.setBadgeText({text: badgeText}).then(() => console.log("set badge to", badgeText));
}
