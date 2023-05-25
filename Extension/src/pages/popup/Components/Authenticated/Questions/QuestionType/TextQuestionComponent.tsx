import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {inputDefaultStyle} from "@pages/popup/Consts/Styles";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {IQuestionAnswer} from "@pages/popup/Interfaces";
import {addOrUpdateAnswers} from "@pages/popup/UtilityFunctions";

interface Props {
    question: TextQuestion;
    index: number;
    setAnswers: Dispatch<SetStateAction<IQuestionAnswer[]>>;
    isValidating: boolean;
}

export function TextQuestionComponent({question, index, setAnswers, isValidating}: Props) {

    const [answer, setAnswer] = useState<string>("");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const answer = event.target.value;
        setAnswer(answer);
        setAnswers((prev) => addOrUpdateAnswers(prev, {questionId: question.questionId, answer: answer}));
    }

    return <>
        <div>{index}) {question.questionText}</div>
        <input
            className={inputDefaultStyle}
            type="text"
            placeholder={"..."}
            required={true}
            value={answer}
            onChange={handleChange}
            disabled={isValidating}
        />
    </>
}