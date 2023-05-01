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
import {Task} from "@pages/popup/model/Task";
import {Question} from "@pages/popup/model/question/Question";
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

    async getTasks() {
        const tasks: Task[] = []

        await dataBase.task.toArray()
            .then((iTask) => tasks.push(...this._createTasks(iTask)))
        return tasks;
    }

    private _createTasks(iTasks: ITask[]): Task[] {
        return iTasks.map(iTask => this._createTask(iTask));
    }

    private _createTask(iTask: ITask): Task {
        const preQuestionnaire = this.getQuestionsFromInterface(iTask.iPreQuestions);
        const postQuestionnaire = this.getQuestionsFromInterface(iTask.iPostQuestions);
        return new Task(iTask.taskId, iTask.text, preQuestionnaire, postQuestionnaire);
    }

    private getQuestionsFromInterface(iQuestions: IQuestion[]): Question[] {
        return iQuestions.map(iQuestion => this._createQuestion(iQuestion)).filter(question => question) as Question[] ?? [];
    }

    private _createQuestion(iQuestion: IQuestion): Question | undefined {
        let question: Question | undefined = undefined;
        switch (iQuestion.type) {
            case "MultipleChoiceQuestion":
                dataBase.multipleChoiceQuestion
                    .get(iQuestion.questionId)
                    .then((iMultiQuestion) => {
                        if (iMultiQuestion?.questionId && iMultiQuestion?.questionText && iMultiQuestion?.choices)
                            question = new MultipleChoiceQuestion(iMultiQuestion.questionId, iMultiQuestion.questionText, iMultiQuestion.choices)
                    })
                    .catch(er => console.log(er));
                break;
            case "TextQuestion":
                dataBase.textQuestion
                    .get(iQuestion.questionId)
                    .then((iTextQuestion) => {
                        if (iTextQuestion?.questionId && iTextQuestion?.questionText && iTextQuestion?.maxCharacters)
                            question = new TextQuestion(iTextQuestion.questionId, iTextQuestion.questionText, iTextQuestion.maxCharacters)
                    })
                    .catch(er => console.log(er));
                break;
            case "RangeQuestion":
                dataBase.rangeQuestion
                    .get(iQuestion.questionId)
                    .then((iRangeQuestion) => {
                        if (iRangeQuestion?.questionId && iRangeQuestion?.questionText && iRangeQuestion?.range)
                            question = new RangeQuestion(iRangeQuestion.questionId, iRangeQuestion.questionText, iRangeQuestion.range)
                    })
                    .catch(er => console.log(er));
                break;
        }
        return question;
    }

}

export const dataBase = new DataBase();