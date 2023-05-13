// db.ts
import Dexie, {Table} from 'dexie';
import {
    IAnswer,
    IDemographics,
    IMultipleChoiceQuestion,
    IQuestion,
    IRangeQuestion,
    IStudy,
    ITab,
    ITask,
    ITextQuestion,
    IUser
} from "@pages/popup/Interfaces";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";


class DataBase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instantiated by Dexie in stores() method)
    user!: Table<IUser, string>; // string = type of the primaryKey
    study!: Table<IStudy, string>;
    task!: Table<ITask, string>;
    multipleChoiceQuestion!: Table<IMultipleChoiceQuestion, string>;
    rangeQuestion!: Table<IRangeQuestion, string>;
    textQuestion!: Table<ITextQuestion, string>;
    demographics!: Table<IDemographics, string>;
    answers!: Table<IAnswer, string>;
    tabs!: Table<ITab, string>;

    //...other tables goes here...

    constructor() {
        super('DataBase');
        this.version(5).stores({
            user: '++id',
            study: 'studyId',
            task: 'taskId, text, iPreQuestions, iPostQuestions, isPreQuestionsSubmitted, isPostQuestionsSubmitted',
            multipleChoiceQuestion: 'questionId, questionText, type, choices',
            rangeQuestion: 'questionId, questionText, type, range',
            textQuestion: 'questionId, questionText, type, maxCharacters',
            demographics: 'id, birthDate, job, sex',
            answers: 'answerId, userId, studyId, taskId, questionId, answer',
            tabs: '++id, tabId, action, timeStamp, userId, studyId, taskId, groupId, tabIndex, windowId, title, url'
        });
    }

    async getITasks() {
        let iTasks: ITask[] = [];
        await dataBase.task.toArray()
            .then((iTask) => iTasks = iTask);
        return iTasks;
    }

    async getQuestionUsingInterface(iQuestion: IQuestion) {
        switch (iQuestion.type) {
            case "MultipleChoiceQuestion": {
                const iMultiQuestion = await dataBase.multipleChoiceQuestion.get(
                    iQuestion.questionId
                );

                return new MultipleChoiceQuestion(
                    iMultiQuestion?.questionId,
                    iMultiQuestion?.questionText,
                    iMultiQuestion?.choices
                );
            }
            case "TextQuestion": {
                const iTextQuestion = await dataBase.textQuestion.get(
                    iQuestion.questionId
                );
                return new TextQuestion(
                    iTextQuestion?.questionId,
                    iTextQuestion?.questionText,
                    iTextQuestion?.maxCharacters
                );
            }
            case "RangeQuestion": {
                const iRangeQuestion = await dataBase.rangeQuestion.get(
                    iQuestion.questionId
                );
                return new RangeQuestion(
                    iRangeQuestion?.questionId,
                    iRangeQuestion?.questionText,
                    iRangeQuestion?.range
                );
            }
            default:
                return new TextQuestion(undefined, undefined, undefined);
        }
    }

    async getQuestionnaire(taskId: string, questionnaireType: string | undefined) {
        const isQuestionnaireTypeLegal = questionnaireType === 'pre' || questionnaireType === 'post';
        if (!isQuestionnaireTypeLegal) throw new Error("questionnaireType is not legal");

        let questions: IQuestion[] = [];
        await dataBase.task.get(taskId)
            .then(iTask => {
                if (questionnaireType === 'pre') questions = iTask?.iPreQuestions ?? []
                else questions = iTask?.iPostQuestions ?? []
            });
        return questions;
    }

    async setDemographics(demographics: IDemographics) {
        await dataBase.demographics.put(demographics);
    }

    async submitQuestionnaire(taskId: string, answers: IAnswer[], questionnaireType: string | undefined) {
        const isQuestionnaireTypeLegal = questionnaireType === 'pre' || questionnaireType === 'post';
        if (!isQuestionnaireTypeLegal) throw new Error("questionnaireType is not legal");

        await dataBase.answers.bulkPut(answers);
    }

    async getStudyId() {
        const studies = await dataBase.study.toArray();
        return studies[0].studyId;
    }

    async getUserId() {
        const users = await dataBase.user.toArray();
        return users[0]?.userId ?? "userId";
    }

    async isQuestionnaireSubmitted(taskId: string, questionnaireType: string | undefined) {
        const isQuestionnaireTypeLegal = questionnaireType === 'pre' || questionnaireType === 'post';
        if (!isQuestionnaireTypeLegal) throw new Error("questionnaireType is not legal");

        const iTask = await dataBase.task.get(taskId);
        return questionnaireType === 'pre' ? iTask?.isPreQuestionsSubmitted : iTask?.isPostQuestionsSubmitted;
    }

    async setQuestionnaireSubmitted(taskId: string, questionnaireType: string | undefined) {
        const isQuestionnaireTypeLegal = questionnaireType === 'pre' || questionnaireType === 'post';
        if (!isQuestionnaireTypeLegal) throw new Error("questionnaireType is not legal");
        const updatedItem = questionnaireType === 'pre' ? {isPreQuestionsSubmitted: true} : {isPostQuestionsSubmitted: true};
        dataBase.task.update(taskId, updatedItem);
    }

    async getLoggingConstants() {
        const userId = await this.getUserId();
        const studyId = await this.getStudyId();

        return {userId: userId, studyId: studyId};
    }

    saveTabInfo(iTab: ITab) {
        dataBase.tabs.add(iTab);
    }

    getLastTabWithId(tabId: number) {
        return dataBase.tabs.where("tabId").equals(tabId).last();
    }

    doesTaskHasPostQuestionnaire(taskId: string) {
        return dataBase.task.get(taskId).then(iTask => iTask?.iPostQuestions.length !== 0);
    }
}

export const dataBase = new DataBase();