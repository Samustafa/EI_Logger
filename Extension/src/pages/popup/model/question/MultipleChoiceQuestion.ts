import {Question} from "@pages/popup/model/question/Question";
import {IQuestion} from "@pages/popup/Interfaces";

export class MultipleChoiceQuestion extends Question {

    private _choices: string[];

    constructor(id: string, question: string, choices: string[]) {
        super(id, question, "MultipleChoiceQuestion");
        this._choices = choices;
    }

    get choices(): string[] {
        return this._choices;
    }

    set choices(value: string[]) {
        this._choices = value;
    }

    extractTaskQuestions(taskId: string): IQuestion {
        return {
            questionId: this.questionId,
            taskId: taskId,
            questionText: this.questionText,
            type: this.type,
            choices: this._choices,
            maxCharacters: undefined,
            range: undefined,
        };
    }
}