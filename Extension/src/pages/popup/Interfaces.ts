import {QuestionType} from "@pages/popup/Types";

export interface IApiException {
    httpStatus: string
    message: string
    timestamp: string
}

export interface IUser {
    userId: string;
}

export interface IStudy {
    studyId: string;
    name: string;
}

export interface ITask {
    taskId: string;
    text: string;
    hasPreQuestionnaire: boolean;
    hasPostQuestionnaire: boolean;
}

export interface IQuestion {
    questionId: string;
    taskId: string;
    type: QuestionType;
    questionText: string;
    choices?: string[];
    range?: number;
    maxCharacters?: number;
}