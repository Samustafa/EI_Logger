import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import browser from "webextension-polyfill";
import {IQuestionAnswer} from "@pages/popup/Interfaces";

export type QuestionTypeAsString = "TextQuestion" | "MultipleChoiceQuestion" | "RangeQuestion";
export type QuestionType = TextQuestion | MultipleChoiceQuestion | RangeQuestion;

export type MessageType = LoggingMessage | LoggingConstantsMessage;
export type LoggingMessage = "START_LOGGING" | "STOP_LOGGING";
export type LoggingConstantsMessage = { studyId?: string, userId?: string, taskId?: string };
export type PortName = "loggingPort" | "loggingConstantsPort";

export type SexType = "m" | "f" | "sex";

export type BadgeText = 'ON' | 'OFF'

export type QuestionnaireType = 'pre' | 'post';

export type ExtensionState =
    'NOT_AUTHENTICATED'
    | 'DISPLAYING_ID'    //id
    | 'DEMOGRAPHICS'  //old demographics
    | 'TASKS_PAGE'
    | 'PRE_QUESTIONNAIRE' //taskId
    | 'LOGGER_READY'      //taskId
    | 'POST_QUESTIONNAIRE'//taskId
    | 'LOGGING';          //taskId

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
    "TAB:OLD"
    | "TAB:CREATED"
    | "TAB:CLOSED"
    | "TAB:URL_CHANGED"
    | "TAB:ACTIVATED"
    | "TAB:BOOKMARK:ADDED"
    | "TAB:BOOKMARK:REMOVED"
    | "TAB:PINNED"
    | "TAB:UNPINNED"
    | "TAB:ATTACHED:TO:WINDOW"
    | "TAB:DETACHED:FROM:WINDOW"

export type UserExtensionAction =
    "SIGNED:UP"
    | "SIGNED:IN"
    | "OPENED:DEMOGRAPHICS"
    | "SUBMITTED:DEMOGRAPHICS"
    | "OPENED:PRE_QUESTIONNAIRE"
    | "SUBMITTED:PRE_QUESTIONNAIRE"
    | "OPENED:POST_QUESTIONNAIRE"
    | "SUBMITTED:POST_QUESTIONNAIRE"
    | "STOPPED:LOGGING"
    | "STARTED:LOGGING"
    | "STARTED:TASK"
    | "FINISHED:TASK";

export type AnswersContextType = {
    answers: IQuestionAnswer[],
    updateAnswers: (questionId: string, value: string) => void;
}