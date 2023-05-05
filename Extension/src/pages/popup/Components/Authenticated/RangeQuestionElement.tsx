import {RangeQuestion} from "@pages/popup/model/question/RangeQuestion";
import {Slider} from "@mui/material";
import {useState} from "react";


interface Props {
    question: RangeQuestion;
    index: number;
}

interface Mark {
    value: number;
    label: string;
}


export function RangeQuestionElement({question, index}: Props) {
    const max = question.range;
    const [value, setValue] = useState<number>(0);


    function getMarks(max: number): Mark[] {
        const arrayWithNumbers = Array.from(Array(max).keys());
        return arrayWithNumbers.map((value): Mark => ({value, label: `${value}`}));
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
                onChange={(event, value) => setValue(value as number)}
            />
        </div>

    </>;
}