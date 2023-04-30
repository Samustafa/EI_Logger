import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";

export type QuestionTypeAsString = "TextQuestion" | "MultipleChoiceQuestion" | "RangeQuestion";
export type QuestionType = TextQuestion | MultipleChoiceQuestion | RangeQuestion;