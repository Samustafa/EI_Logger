import {IApiException, IQuestionAnswer} from "@pages/popup/Interfaces";
import {QuestionType} from "@pages/popup/Types";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {Question} from "@pages/popup/model/question/Question";

/**
 * Extracts the server exception from response or extracts error message if server didn't respond
 * @param error
 * @param setError
 */
export function extractAndSetError(error: any, setError: (error: string) => void) {
    console.log(error)
    const serverException: IApiException = error.response?.data;
    setError(serverException ? serverException.message : error.message);
}

export function castToChildQuestion(question: Question): QuestionType {
    switch (question.type) {
        case "MultipleChoiceQuestion": {
            const castedQuestion = question as MultipleChoiceQuestion;
            return new MultipleChoiceQuestion(castedQuestion.questionId, castedQuestion.questionText, castedQuestion.choices)
        }
        case "RangeQuestion": {
            const castedQuestion = question as RangeQuestion;
            return new RangeQuestion(castedQuestion.questionId, castedQuestion.questionText, castedQuestion.range);
        }
        case "TextQuestion": {
            const castedQuestion = question as TextQuestion;
            return new TextQuestion(castedQuestion.questionId, castedQuestion.questionText, castedQuestion.maxCharacters);
        }
    }
}

export function addOrUpdateAnswers(iQuestionAnswers: IQuestionAnswer[], answer: IQuestionAnswer) {
    const index = iQuestionAnswers.findIndex((a) => a.questionId === answer.questionId);

    if (-1 === index) {
        return [...iQuestionAnswers, answer];
    }
    return [...iQuestionAnswers.slice(0, index), answer, ...iQuestionAnswers.slice(index + 1)];
};