import {Question} from "@pages/popup/model/question/Question";
import {IQuestion} from "@pages/popup/Interfaces";

export class RangeQuestion extends Question {
    private _range: number;


    constructor(id: string, question: string, range: number) {
        super(id, question, "RangeQuestion");
        this._range = range;
    }

    get range(): number {
        return this._range;
    }

    set range(value: number) {
        this._range = value;
    }

    mapToIQuestion(): IQuestion {
        return {
            questionId: this.questionId,
            questionText: this.questionText,
            type: this.type,
            choices: undefined,
            maxCharacters: undefined,
            range: this._range,
        }
    }
}