import {Question} from "@pages/popup/model/question/Question";

export class Task {
    private _taskId: string;
    private _text: string;
    private _preQuestions?: Question[];
    private _postQuestions?: Question[];
    private _hasPreQuestionnaire: boolean;
    private _hasPostQuestionnaire: boolean;

    constructor(taskId: string, text: string, preQuestions?: Question[], postQuestions?: Question[]) {
        this._taskId = taskId;
        this._text = text;
        this._preQuestions = preQuestions;
        this._postQuestions = postQuestions;
        this._hasPreQuestionnaire = !!preQuestions && preQuestions.length > 0;
        this._hasPostQuestionnaire = !!postQuestions && postQuestions.length > 0;
    }

    extractQuestions() {
        const preQuestions = this._preQuestions?.map((q: Question) => q.extractTaskQuestions(this.taskId)) ?? []
        const postQuestions = this._postQuestions?.map((q: Question) => q.extractTaskQuestions(this.taskId)) ?? []

        return [...preQuestions, ...postQuestions]
    }

    get taskId(): string {
        return this._taskId;
    }

    set taskId(value: string) {
        this._taskId = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get hasPreQuestionnaire(): boolean {
        return this._hasPreQuestionnaire;
    }

    set hasPreQuestionnaire(value: boolean) {
        this._hasPreQuestionnaire = value;
    }

    get hasPostQuestionnaire(): boolean {
        return this._hasPostQuestionnaire;
    }

    set hasPostQuestionnaire(value: boolean) {
        this._hasPostQuestionnaire = value;
    }

    get preQuestions(): Question[] | undefined {
        return this._preQuestions;
    }

    set preQuestions(value: Question[] | undefined) {
        this._preQuestions = value;
    }

    get postQuestions(): Question[] | undefined {
        return this._postQuestions;
    }

    set postQuestions(value: Question[] | undefined) {
        this._postQuestions = value;
    }
}