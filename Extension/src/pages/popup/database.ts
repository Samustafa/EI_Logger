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
    IUser,
    IUserExtensionInteraction
} from "@pages/popup/Interfaces";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import {QuestionnaireType, UserExtensionAction} from "@pages/popup/Types";
import {getUTCDateTime} from "@pages/popup/UtilityFunctions";
import {loggingConstants} from "@pages/background/LoggingConstants";


class DataBase extends Dexie {
    user!: Table<IUser, string>;
    study!: Table<IStudy, string>;
    task!: Table<ITask, string>;
    multipleChoiceQuestion!: Table<IMultipleChoiceQuestion, string>;
    rangeQuestion!: Table<IRangeQuestion, string>;
    textQuestion!: Table<ITextQuestion, string>;
    demographics!: Table<IDemographics, string>;
    answers!: Table<IAnswer, string>;
    tabs!: Table<ITab, string>;
    userExtensionInteraction!: Table<IUserExtensionInteraction, string>;

    //...other tables goes here...

    constructor() {
        super('DataBase');
        this.version(6).stores({
            user: '++id',
            study: 'studyId',
            task: 'taskId, text, iPreQuestions, iPostQuestions, isPreQuestionsSubmitted, isPostQuestionsSubmitted',
            multipleChoiceQuestion: 'questionId, questionText, type, choices',
            rangeQuestion: 'questionId, questionText, type, range',
            textQuestion: 'questionId, questionText, type, maxCharacters',
            demographics: 'id, birthDate, job, sex',
            answers: 'answerId, userId, studyId, taskId, questionId, answer',
            tabs: '++id, tabId, action, timeStamp, userId, studyId, taskId, groupId, tabIndex, windowId, title, url',
            userExtensionInteraction: '++id, action, timeStamp, userId, studyId, taskId'
        });
    }

    addUserToDataBase(userId: IUser) {
        dataBase.user.add(userId);
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

    async getStudyId(): Promise<string | undefined> {
        const studies = await dataBase.study.toArray();
        return studies[0]?.studyId;
    }

    async getUserId(): Promise<string | undefined> {
        const users = await dataBase.user.toArray();
        return users[0]?.userId;
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

        if (userId === undefined || studyId === undefined) throw new Error('User or study id is undefined');
        return {userId: userId, studyId: studyId};
    }

    saveTabInfo(iTab: ITab) {
        dataBase.tabs.add(iTab);
    }

    getLastTabWithId(tabId: number) {
        return dataBase.tabs.where("tabId").equals(tabId).last();
    }

    doesTaskHasQuestionnaire(taskId: string, questionnaireType: QuestionnaireType) {
        return dataBase.task.get(taskId).then(iTask => {
            return questionnaireType === 'pre' ? iTask?.iPreQuestions.length !== 0 : iTask?.iPostQuestions.length !== 0
        });
    }

    logUserExtensionInteraction(action: UserExtensionAction): void {
        const log = {
            action: action,
            timeStamp: getUTCDateTime(),
            userId: loggingConstants.userId,
            studyId: loggingConstants.studyId,
        }

        dataBase.userExtensionInteraction.add(log);
    }

    saveStudyInfo(study: IStudy, tasks: ITask[], multipleChoiceQuestions: IMultipleChoiceQuestion[], textQuestions: ITextQuestion[], rangeQuestions: IRangeQuestion[]) {
        dataBase.study.add(study)
        dataBase.task.bulkAdd(tasks)
        dataBase.multipleChoiceQuestion.bulkAdd(multipleChoiceQuestions);
        dataBase.textQuestion.bulkAdd(textQuestions);
        dataBase.rangeQuestion.bulkAdd(rangeQuestions);
    }

    isStudyExists(): Promise<boolean> {
        return dataBase.study.count().then(count => count > 0);
    }
}

export const dataBase = new DataBase();