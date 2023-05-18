import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import browser from "webextension-polyfill";

export type QuestionTypeAsString = "TextQuestion" | "MultipleChoiceQuestion" | "RangeQuestion";
export type QuestionType = TextQuestion | MultipleChoiceQuestion | RangeQuestion;

export type MessageType = {
    data: "message1"
}
export type PortName = {
    name: "port1" | "port2"
}

export type BadgeText = {
    text: 'ON' | 'OFF'
}

export type OnUpdatedChangeInfoType = browser.Tabs.OnUpdatedChangeInfoType;
export type Tab = browser.Tabs.Tab;
export type TabWithGroupId = Tab & { groupId: number };
export type Port = browser.Runtime.Port;
export type OnActivatedActiveInfoType = browser.Tabs.OnActivatedActiveInfoType;
export type OnCompletedDetailsType = browser.WebNavigation.OnCompletedDetailsType;
export type BookMark = browser.Bookmarks.BookmarkTreeNode
export type RemoveInfo = { parentId: string, index: number, node: BookMark }
export type AttachInfo = { newWindowId: number, newPosition: number }
export type DetachInfo = { oldWindowId: number, oldPosition: number }
export type TabAction =
    "TAB:CREATED"
    | "TAB:CLOSED"
    | "TAB:URL_CHANGED"
    | "TAB:ACTIVATED"
    | "TAB:BOOKMARK:ADDED"
    | "TAB:BOOKMARK:REMOVED"
    | "TAB:PINNED"
    | "TAB:UNPINNED"
    | "TAB:ATTACHED:TO:WINDOW"
    | "TAB:DETACHED:FROM:WINDOW"

export type UserExtensionAction = "SIGNED:UP" | "SIGNED:IN";