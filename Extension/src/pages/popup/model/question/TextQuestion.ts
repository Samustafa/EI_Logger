import {Question} from "@pages/popup/model/question/Question";
import {ITextQuestion} from "@pages/popup/Interfaces";

export class TextQuestion extends Question {

    private _maxCharacters: number;


    constructor(id: string, question: string, maxCharacters: number) {
        super(id, question, "TextQuestion");
        this._maxCharacters = maxCharacters;
    }

    get maxCharacters(): number {
        return this._maxCharacters;
    }

    set maxCharacters(value: number) {
        this._maxCharacters = value;
    }

    mapToIQuestion(): ITextQuestion {
        return {
            questionId: this.questionId,
            type: this.type,
            questionText: this.questionText,
            maxCharacters: this.maxCharacters
        }
    }
}