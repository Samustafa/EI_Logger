import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import {Slider} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import {IQuestionAnswer} from "@pages/popup/Interfaces";
import {addOrUpdateAnswers} from "@pages/popup/UtilityFunctions";


interface Props {
    question: RangeQuestion;
    index: number;
    setAnswers: Dispatch<SetStateAction<IQuestionAnswer[]>>;
    isValidating: boolean;
}

interface Mark {
    value: number;
    label: string;
}


export function RangeQuestionComponent({question, index, setAnswers, isValidating}: Props) {
    const max = question.range;
    const [value, setValue] = useState<number>(0);


    function getMarks(max: number): Mark[] {
        const arrayWithNumbers = Array.from(Array(max).keys());
        return arrayWithNumbers.map((value): Mark => ({value, label: `${value}`}));
    }

    function handleChange(value: number | number[]) {
        setValue(value as number);
        setAnswers((prev) => addOrUpdateAnswers(prev, {questionId: question.questionId, answer: `${value}`}));
    }

    return <>
        <div>{index}{question.questionText}</div>
        <div className={"text-white"}>
            <Slider
                style={{}}
                aria-label="answer-value"
                defaultValue={0}
                getAriaValueText={(value,) => `${value}`}
                valueLabelDisplay="auto"
                step={1}
                marks={getMarks(max)}
                min={0}
                max={max}
                value={value}
                onChange={(event, value) => handleChange(value)}
                disabled={isValidating}
            />
        </div>

    </>;
}