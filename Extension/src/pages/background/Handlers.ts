import {OnRemovedRemoveInfoType, OnUpdatedChangeInfoType, Tab, TabAction, TabWithGroupId} from "@pages/popup/Types";
import dayjs from "dayjs";
import {ITab} from "@pages/popup/Interfaces";
import {loggingConstants} from "@pages/background/LoggingConstants";
import {dataBase} from "@pages/popup/database";


const dataBaseBuffer = new Map<number, ITab>();
const openedTabsCache = new Map<number, string>();


export function handleTabUpdated(id: number, changeInfo: OnUpdatedChangeInfoType, tab: Tab) {


    const isNewWebSite = (changeInfo.url !== undefined) && (changeInfo.url !== openedTabsCache.get(id))
    console.log("isNewWebSite", isNewWebSite)
    console.log("openedTabsCache", openedTabsCache)
    if (isNewWebSite) handleOldTabNewUrl(tab)
    else handleOldTabOldURL(changeInfo, tab)


    function handleOldTabNewUrl(tab: Tab) {
        console.log("handleOldTabNewUrl")
        const iTab = prePareTab(tab, "TAB:URL_CHANGED");
        addToCacheAndBuffer(iTab);
    }

    function handleOldTabOldURL(changeInfo: OnUpdatedChangeInfoType, tab: Tab) {
        const isTitleChangeForTabInBuffer = changeInfo.title && dataBaseBuffer.has(id);

        if (isTitleChangeForTabInBuffer) handleTitleUpdated(changeInfo?.title ?? "", tab);
        else if (changeInfo.pinned !== undefined) {
            const iTab = prePareTab(tab, changeInfo.pinned ? "TAB:PINNED" : "TAB:UNPINNED");
            dataBase.saveTabInfo(iTab);
        }

        function handleTitleUpdated(title: string, tab: Tab) {
            const tabId = tab?.id ?? -1;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const tabToSave = dataBaseBuffer.get(tabId)!;
            tabToSave.title = title;

            dataBase.saveTabInfo(tabToSave);

            dataBaseBuffer.delete(tabId);
        }
    }

}

export function handleTabCreated(tab: Tab) {
    const iTab = prePareTab(tab, "TAB:CREATED");
    addToCacheAndBuffer(iTab);
}

export function handleTabRemoved(tabId: number, removeInfo: OnRemovedRemoveInfoType) {
    const iTab: ITab = {
        action: "TAB:CLOSED",
        taskId: loggingConstants.taskId,
        studyId: loggingConstants.studyId,
        userId: loggingConstants.userId,
        tabId: tabId,
        windowId: removeInfo.windowId,
        timeStamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        title: "",
        url: "",
        groupId: -1,
        tabIndex: -1,
    };
    dataBase.saveTabInfo(iTab);
    openedTabsCache.delete(tabId);
}

//Helper Functions
function prePareTab(tab: Tab, tabAction: TabAction) {
    const tabExtended = tab as TabWithGroupId;

    const timeStamp = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const iTab: ITab = {
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
    return iTab;
}

function addToCacheAndBuffer(iTab: ITab) {
    dataBaseBuffer.set(iTab.tabId, iTab);
    openedTabsCache.set(iTab.tabId, iTab.url);
}