// db.ts
import Dexie, {Table} from 'dexie';
import {
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

    //...other tables goes here...

    constructor() {
        super('DataBase');
        this.version(1).stores({
            user: '++id', // Primary key and indexed props
            study: 'studyId',
            task: 'taskId, text',
            multipleChoiceQuestion: 'questionId, questionText, type, choices',
            rangeQuestion: 'questionId, questionText, type, range',
            textQuestion: 'questionId, questionText, type, maxCharacters',
            //...other tables goes here...
        });
    }

    // async getTasks() {
    //     const tasks: Task[] = []
    //
    //     await dataBase.task.toArray()
    //         .then((iTask) => tasks.push(...this._createTasks(iTask)))
    //     return tasks;
    // }

    // private _createTasks(iTasks: ITask[]): Task[] {
    //     return iTasks.map(iTask => this._createTask(iTask));
    // }

    // private _createTask(iTask: ITask): Task {
    //     const preQuestionnaire = this.getQuestionsFromInterface(iTask.iPreQuestions);
    //     const postQuestionnaire = this.getQuestionsFromInterface(iTask.iPostQuestions);
    //     return new Task(iTask.taskId, iTask.text, preQuestionnaire, postQuestionnaire);
    // }
    //
    // private getQuestionsFromInterface(iQuestions: IQuestion[] | undefined): Question[] {
    //     return iQuestions?.map(iQuestion => this._createQuestion(iQuestion)).filter(question => question) as Question[] ?? [];
    // }

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

}

export const dataBase = new DataBase();