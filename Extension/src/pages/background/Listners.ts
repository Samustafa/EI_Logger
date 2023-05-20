import browser from "webextension-polyfill";
import {
    handleBookmarkCreated,
    handleBookmarkRemoved,
    handleLogAllExistingTabs,
    handleOnCompleted,
    handleTabActivated,
    handleTabAttached,
    handleTabDetached,
    handleTabRemoved,
    handleTabUpdated
} from "@pages/background/Handlers";
import {MessageType, Port} from "@pages/popup/Types";
import {setBadgeText} from "@pages/background/backgroundFunctions";
import {dataBase} from "@pages/popup/database";


export function startListening() {
    browser.runtime.onConnect.addListener(connectPort);
}

function connectPort(port: Port) {
    console.log(`service worker connected to port ${port.name}`);
    port.onMessage.addListener(receiveMessage);
}

function receiveMessage(message: MessageType) {
    if (message === "START_LOGGING") {
        console.log("start logging");
        handleLogAllExistingTabs();
        activateAllListens();
        setBadgeText('ON');
        dataBase.logUserExtensionInteraction("STARTED:LOGGING");
    } else if (message === "STOP_LOGGING") {
        console.log("stop logging");
        disRegardAllListeners();
        setBadgeText('OFF');
        dataBase.logUserExtensionInteraction("STOPPED:LOGGING");

    }
}

function activateAllListens() {
    listenOnCompleted();
    listenTabActivated();
    listenTabRemoved();
    listenTabUpdated();
    listenBookmarkCreated();
    listenBookmarkRemoved();
    listenTabAttached();
    listenTabDetached();

}

function disRegardAllListeners() {
    disregardOnCompleted();
    disregardTabActivated();
    disregardTabRemoved();
    disregardTabUpdated();
    disregardBookmarkCreated();
    disregardBookmarkRemoved();
    disregardTabAttached();
    disregardTabDetached();
}

function listenTabUpdated() {
    browser.tabs.onUpdated.addListener(handleTabUpdated)
}

function disregardTabUpdated() {
    browser.tabs.onUpdated.removeListener(handleTabUpdated)
}

function listenTabRemoved() {
    browser.tabs.onRemoved.addListener(handleTabRemoved);
}

function disregardTabRemoved() {
    browser.tabs.onRemoved.removeListener(handleTabRemoved);
}

function listenTabActivated() {
    browser.tabs.onActivated.addListener(handleTabActivated)
}

function disregardTabActivated() {
    browser.tabs.onActivated.removeListener(handleTabActivated);
}

/**
 * listen to a tab When a tab when it completes loading: listens to tab creation
 */
function listenOnCompleted() {
    browser.webNavigation.onCompleted.addListener(handleOnCompleted);
}

function disregardOnCompleted() {
    browser.webNavigation.onCompleted.removeListener(handleOnCompleted);
}

function listenBookmarkCreated() {
    browser.bookmarks.onCreated.addListener(handleBookmarkCreated);
}

function disregardBookmarkCreated() {
    browser.bookmarks.onCreated.removeListener(handleBookmarkCreated);
}

function listenBookmarkRemoved() {
    browser.bookmarks.onRemoved.addListener(handleBookmarkRemoved);
}

function disregardBookmarkRemoved() {
    browser.bookmarks.onRemoved.removeListener(handleBookmarkRemoved);
}

function listenTabAttached() {
    browser.tabs.onAttached.addListener(handleTabAttached)
}

function disregardTabAttached() {
    browser.tabs.onAttached.removeListener(handleTabAttached)
}

function listenTabDetached() {
    browser.tabs.onDetached.addListener(handleTabDetached)
}

function disregardTabDetached() {
    browser.tabs.onDetached.removeListener(handleTabDetached)
}
