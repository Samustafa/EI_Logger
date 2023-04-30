import {Question} from "@pages/popup/model/question/Question";
import {IRangeQuestion} from "@pages/popup/Interfaces";

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

    mapToIQuestion(): IRangeQuestion {
        return {
            questionId: this.questionId,
            type: this.type,
            questionText: this.questionText,
            range: this.range
        }
    }
}