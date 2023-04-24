import {QuestionType} from "@pages/popup/Types";
import {IQuestion} from "@pages/popup/Interfaces";

export abstract class Question {
    private _questionId: string;
    private _questionText: string;
    private _type: QuestionType;

    protected constructor(id: string, question: string, type: QuestionType) {
        this._questionId = id;
        this._questionText = question;
        this._type = type;
    }


    get questionId(): string {
        return this._questionId;
    }

    set questionId(value: string) {
        this._questionId = value;
    }

    get questionText(): string {
        return this._questionText;
    }

    set questionText(value: string) {
        this._questionText = value;
    }

    get type(): QuestionType {
        return this._type;
    }

    set type(value: QuestionType) {
        this._type = value;
    }

    abstract extractTaskQuestions(taskId: string): IQuestion;
}