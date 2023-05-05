import {TextQuestion} from "@pages/popup/model/question/TextQuestion";
import {inputDefaultStyle} from "@pages/popup/Consts/Styles";
import {useState} from "react";

interface Props {
    question: TextQuestion;
    index: number;
}

export function TextQuestionElement({question, index}: Props) {

    const [answer, setAnswer] = useState<string>("");
    const [isValidating,] = useState<boolean>(false);
    return <>
        <div>{index}{question.questionText}</div>
        <input
            className={inputDefaultStyle}
            type="text"
            placeholder={"..."}
            required={true}
            value={answer}
            onChange={event => {
                setAnswer(event.target.value);
            }}
            form={"registrationForm"}
            disabled={isValidating}
        />
    </>
}