import {IQuestion, IQuestionAnswer} from "@pages/popup/Interfaces";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Question} from "@pages/popup/model/question/Question";
import {dataBase} from "@pages/popup/database";
import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {
    TextQuestionComponent
} from "@pages/popup/Components/Authenticated/Questions/QuestionType/TextQuestionComponent";
import {
    RangeQuestionComponent
} from "@pages/popup/Components/Authenticated/Questions/QuestionType/RangeQuestionComponent";
import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import {
    MultipleChoiceQuestionComponent
} from "@pages/popup/Components/Authenticated/Questions/QuestionType/MultipleChoiceQuestionComponent";

interface Props {
    index: number;
    iQuestion: IQuestion;
    setAnswers: Dispatch<SetStateAction<IQuestionAnswer[]>>;
    isValidating: boolean;
}

export function QuestionComponent({index, iQuestion, setAnswers, isValidating}: Props) {
    const [question, setQuestion] = useState<Question | undefined>(undefined);

    useEffect(function fetchQuestion() {
        dataBase.getQuestionUsingInterface(iQuestion)
            .then((question) => setQuestion(question))
            .catch((error) => console.log(error));
    }, []);

    function getQuestionFromParent(question: Question | undefined, index: number) {
        switch (question?.type) {
            case "MultipleChoiceQuestion":
                return <MultipleChoiceQuestionComponent question={question as MultipleChoiceQuestion}
                                                        index={index}
                                                        setAnswers={setAnswers}
                                                        isValidating={isValidating}/>;
            case "TextQuestion":
                return <TextQuestionComponent question={question as TextQuestion}
                                              index={index}
                                              setAnswers={setAnswers}
                                              isValidating={isValidating}/>;
            case "RangeQuestion":
                return <RangeQuestionComponent question={question as RangeQuestion}
                                               index={index}
                                               setAnswers={setAnswers}
                                               isValidating={isValidating}/>;
            default:
                return <TextQuestionComponent question={new TextQuestion("-1", "Error", -1)}
                                              index={-1}
                                              setAnswers={setAnswers}
                                              isValidating={isValidating}/>;

        }
    }

    return (
        <>
            {getQuestionFromParent(question, index)}
        </>
    )
        ;
}