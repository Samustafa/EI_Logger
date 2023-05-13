import browser from "webextension-polyfill";
import {
    handleBookmarkCreated,
    handleBookmarkRemoved,
    handleOnCompleted,
    handleTabActivated,
    handleTabAttached,
    handleTabDetached,
    handleTabRemoved,
    handleTabUpdated
} from "@pages/background/Handlers";
import {Port} from "@pages/popup/Types";


export function startListening() {
    browser.runtime.onConnect.addListener(connectPort);
}

function connectPort(port: Port) {
    console.log(`service worker connected to port ${port.name}`);
    port.onMessage.addListener(receiveMessage);
}

function receiveMessage(message: { data: string }) {
    console.log(`service worker received message ${message.data}`);
    listenTabDetahed();
    listenTabAttached();
}

function listenTabUpdated() {
    browser.tabs.onUpdated.addListener(handleTabUpdated)
}

function listenTabRemoved() {
    browser.tabs.onRemoved.addListener(handleTabRemoved);
}

function listenTabActivated() {
    browser.tabs.onActivated.addListener(handleTabActivated)
}

/**
 * listen to a tab When a tab when it completes loading: listens to tab creation
 */
function listenOnCompleted() {
    browser.webNavigation.onCompleted.addListener(handleOnCompleted);
}

function listenBookmarkCreated() {
    browser.bookmarks.onCreated.addListener(handleBookmarkCreated);
}

function listenBookmarkRemoved() {
    browser.bookmarks.onRemoved.addListener(handleBookmarkRemoved);
}

function listenTabAttached() {
    browser.tabs.onAttached.addListener(handleTabAttached)
}

function listenTabDetahed() {
    browser.tabs.onDetached.addListener(handleTabDetached)
}
