import browser from "webextension-polyfill";
import {handleTabCreated, handleTabUpdated} from "@pages/background/Handlers";
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
    listenTabUpdated();
    listenTabCreated();
}

function listenTabUpdated() {
    browser.tabs.onUpdated.addListener(handleTabUpdated)
}

function listenTabCreated() {
    browser.tabs.onCreated.addListener(handleTabCreated)
}
