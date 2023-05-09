import {OnUpdatedChangeInfoType, Tab} from "@pages/popup/Types";


export function handleTabUpdated(id: number, changeInfo: OnUpdatedChangeInfoType, tab: Tab) {
    if (changeInfo.url) {
        console.log("id url -->", tab.id, tab.url)
        console.log("")
    } else if (changeInfo.title) {
        console.log("id title -->", tab.id, tab.title)
        console.log("")
    }
}
