import browser from "webextension-polyfill";
import {
    handleBookmarkCreated,
    handleBookmarkRemoved,
    handleLogAllExistingTabs,
    handleOnCompleted,
    handleOnInstalled,
    handleTabActivated,
    handleTabAttached,
    handleTabDetached,
    handleTabRemoved,
    handleTabUpdated,
    setBadgeText
} from "@pages/background/Handlers";
import {LoggingConstantsMessage, LoggingMessage, MessageType, Port, PortName} from "@pages/popup/Types";
import {bgLoggingConstants} from "@pages/background/BGLoggingConstants";


//--------------- Communication functions ---------------//
function connectPort(port: Port) {
    const portName = port.name as PortName;
    console.log(`service worker connected to port ${portName}`);

    switch (portName) {
        case 'loggingPort':
            port.onMessage.addListener(loggingPortMR)
            break;
        case 'loggingConstantsPort':
            port.onMessage.addListener(loggingConstantsMR)
            break;
    }
}

/**
 * loggingPort message receiver
 * @param message
 */
async function loggingPortMR(message: MessageType) {
    message = message as LoggingMessage;
    if (message === "START_LOGGING") {
        await handleLogAllExistingTabs();
        activateAllListens();
        setBadgeText('ON');
    } else if (message === "STOP_LOGGING") {
        disRegardAllListeners();
        setBadgeText('OFF');
    }
}

/**
 * loggingConstantsPort message receiver
 * @param message
 */
function loggingConstantsMR(message: MessageType) {
    message = message as LoggingConstantsMessage;

    bgLoggingConstants.studyId = message.studyId ?? bgLoggingConstants.studyId;
    bgLoggingConstants.userId = message.userId ?? bgLoggingConstants.userId;
    bgLoggingConstants.taskId = message.taskId ?? bgLoggingConstants.taskId;
}

//--------------- end Communication functions ---------------//


export function startListening() {
    browser.runtime.onInstalled.addListener(() => handleOnInstalled());
    browser.runtime.onConnect.addListener(connectPort);
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
