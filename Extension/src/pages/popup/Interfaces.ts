import {QuestionTypeAsString} from "@pages/popup/Types";

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
    text: string;
    hasPreQuestionnaire: boolean;
    hasPostQuestionnaire: boolean;
    preQuestionsIds: string[];
    postQuestionsIds: string[];
}

export interface IQuestion {
    questionId: string;
    type: QuestionTypeAsString;
    questionText: string;
    choices?: string[];
    range?: number;
    maxCharacters?: number;
}