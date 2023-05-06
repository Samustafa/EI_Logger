// db.ts
import Dexie, {Table} from 'dexie';
import {
    IAnswer,
    IDemographics,
    IMultipleChoiceQuestion,
    IQuestion,
    IRangeQuestion,
    IStudy,
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

    //...other tables goes here...

    constructor() {
        super('DataBase');
        this.version(4).stores({
            user: '++id', // Primary key and indexed props
            study: 'studyId',
            task: 'taskId, text, iPreQuestions, iPostQuestions, isPreQuestionsSubmitted, isPostQuestionsSubmitted',
            multipleChoiceQuestion: 'questionId, questionText, type, choices',
            rangeQuestion: 'questionId, questionText, type, range',
            textQuestion: 'questionId, questionText, type, maxCharacters',
            demographics: 'id, birthDate, job, sex',
            answers: '++answerId, userId, studyId, taskId, questionId, answer'
            //...other tables goes here...
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

    async getPreQuestionnaire(taskId: string) {
        let preQuestionnaire: IQuestion[] = [];
        await dataBase.task.get(taskId)
            .then(iTask => preQuestionnaire = iTask?.iPreQuestions ?? []);
        return preQuestionnaire;
    }

    async setDemographics(demographics: IDemographics) {
        await dataBase.demographics.put(demographics);
    }

    async submitPreQuestionnaire(taskId: string, answers: IAnswer[]) {
        await dataBase.answers.bulkPut(answers);
    }

    async getStudyId() {
        const studies = await dataBase.study.toArray();
        return studies[0].studyId;
    }

    async getUserId() {
        const users = await dataBase.user.toArray();
        return users[0].userId;
    }

    async isPreQuestionnaireSubmitted(taskId: string) {
        const iTask = await dataBase.task.get(taskId).catch(error => console.log(error));
        return iTask?.isPreQuestionsSubmitted ?? false;
    }

    async setPreQuestionnaireSubmitted(taskId: string) {
        dataBase.task.update(taskId, {isPreQuestionsSubmitted: true});
    }
}

export const dataBase = new DataBase();