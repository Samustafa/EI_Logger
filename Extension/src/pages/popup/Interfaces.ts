import {QuestionTypeAsString, TabAction, UserExtensionAction} from "@pages/popup/Types";

export interface IApiException {
    httpStatus: string
    message: string
    timestamp: string
}

export interface IUser {
    id: 0;
    userId: string;
}

export interface IStudy {
    studyId: string;
    name: string;
}

export interface ITask {
    taskId: string;
    text: string;
    isPreQuestionsSubmitted: boolean;
    isPostQuestionsSubmitted: boolean;
    iPreQuestions: IQuestion[];
    iPostQuestions: IQuestion[];
}

export interface IQuestion {
    questionId: string;
    type: QuestionTypeAsString;
}

export interface IMultipleChoiceQuestion extends IQuestion {
    questionId: string;
    type: QuestionTypeAsString;
    questionText: string;
    choices: string[];
}

export interface ITextQuestion extends IQuestion {
    questionId: string;
    type: QuestionTypeAsString;
    questionText: string;
    maxCharacters: number;
}

export interface IRangeQuestion extends IQuestion {
    questionId: string;
    type: QuestionTypeAsString;
    questionText: string;
    range: number;
}

export interface IAnswer {
    answerId: string;
    userId: string;
    studyId: string;
    taskId: string;
    questionId: string;
    answer: string;
}

export interface IQuestionAnswer {
    questionId: string;
    answer: string;
}

export interface IDemographics {
    id: string;
    birthDate: string;
    job: string;
    sex: string;

}

export interface ITab {
    tabId: number;
    action: TabAction;
    timeStamp: string;
    userId: string
    studyId: string;
    taskId: string;
    groupId: number
    tabIndex: number;
    windowId: number;
    title: string;
    url: string;
}

export interface IUserExtensionInteraction {
    action: UserExtensionAction;
    timeStamp: string;
    userId?: string;
    studyId?: string;
    taskId?: string;
}