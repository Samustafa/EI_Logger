import {
    OnActivatedActiveInfoType,
    OnCompletedDetailsType,
    OnUpdatedChangeInfoType,
    Tab,
    TabAction,
    TabWithGroupId
} from "@pages/popup/Types";
import dayjs from "dayjs";
import {ITab} from "@pages/popup/Interfaces";
import {loggingConstants} from "@pages/background/LoggingConstants";
import {dataBase} from "@pages/popup/database";
import {tabs} from "webextension-polyfill";


const openedTabsCache = new Map<number, string>();

export function handleOnCompleted(details: OnCompletedDetailsType) {
    const tabFinishedLoading = 0;
    if (details.frameId !== tabFinishedLoading) return

    tabs.get(details.tabId)
        .then(tab => handleSaveAfterNewTabOrNewUrl(tab, "TAB:CREATED"))
        .catch(e => console.error("handleOnCompleted " + JSON.stringify(e)));
}

export function handleTabUpdated(id: number, changeInfo: OnUpdatedChangeInfoType, tab: Tab) {

    const isNewURL = (changeInfo.url !== undefined) && (changeInfo.url !== openedTabsCache.get(id))

    if (isNewURL) handleSaveAfterNewTabOrNewUrl(tab, "TAB:URL_CHANGED")
    else if (changeInfo.pinned !== undefined) {
        const iTab = prePareITabFromTab(tab, changeInfo.pinned ? "TAB:PINNED" : "TAB:UNPINNED");
        dataBase.saveTabInfo(iTab);
    }
}

export function handleTabRemoved(tabId: number) {
    dataBase.getLastTabWithId(tabId)
        .then((iTab) => {
            if (!iTab) throw new Error(`handleTabRemoved: Couldn't fetch tab with the ID ${tabId}`)
            dataBase.saveTabInfo(prePareITabFromITab(iTab, "TAB:CLOSED"));
        })
        .catch((e) => console.error("e -->", e))
}

export function handleTabActivated(onActivatedActiveInfoType: OnActivatedActiveInfoType) {
    dataBase.getLastTabWithId(onActivatedActiveInfoType.tabId)
        .then((iTab) => {
            if (!iTab) throw new Error(`handleTabActivated: Couldn't fetch tab with the ID ${onActivatedActiveInfoType.tabId}`)
            dataBase.saveTabInfo(prePareITabFromITab(iTab, "TAB:ACTIVATED"))
        })
        .catch((e) => console.error("e -->", e))
}


//Helper Functions
function prePareITabFromTab(tab: Tab, tabAction: TabAction): ITab {
    const tabExtended = tab as TabWithGroupId;

    const timeStamp = dayjs().format("YYYY-MM-DD HH:mm:ss");

    return {
        action: tabAction,
        timeStamp: timeStamp,
        userId: loggingConstants.userId,
        studyId: loggingConstants.studyId,
        taskId: loggingConstants.taskId,
        groupId: tabExtended.groupId,
        tabId: tab?.id ?? -1,
        tabIndex: tab.index,
        windowId: tab?.windowId ?? -1,
        title: tab?.title ?? "",
        url: tab?.pendingUrl ?? tab?.url ?? "",
    }
}

function prePareITabFromITab(tab: ITab, tabAction: TabAction): ITab {

    const timeStamp = dayjs().format("YYYY-MM-DD HH:mm:ss");

    return {
        action: tabAction,
        timeStamp: timeStamp,
        userId: loggingConstants.userId,
        studyId: loggingConstants.studyId,
        taskId: loggingConstants.taskId,
        groupId: tab.groupId,
        tabId: tab.tabId,
        tabIndex: tab.tabIndex,
        windowId: tab.windowId,
        title: tab.title,
        url: tab.url,
    }
}

function handleSaveAfterNewTabOrNewUrl(tab: Tab, tabAction: TabAction) {
    const iTab = prePareITabFromTab(tab, tabAction);
    dataBase.saveTabInfo(iTab);
    openedTabsCache.set(iTab.tabId, iTab.url)
}