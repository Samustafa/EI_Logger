import browser from "webextension-polyfill";
import {startListening} from "@pages/background/Listners";
import {BadgeText} from "@pages/popup/Types";

export function initializeBackground() {
    browser.runtime.onInstalled.addListener(() => setBadgeText({text: 'OFF'}))
    startListening();
}

export function setBadgeText(badgeText: BadgeText) {
    browser.action.setBadgeText({text: badgeText.text}).then(() => console.log("set badge to OFF"));
}

//look again at the original files

