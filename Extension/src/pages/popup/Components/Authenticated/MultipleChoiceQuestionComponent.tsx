import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {ChangeEvent, useState} from "react";

interface Props {
    question: MultipleChoiceQuestion;
    index: number;
}

export function MultipleChoiceQuestionElement({question, index}: Props) {
    const [value, setValue] = useState('female');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };


    return <>
        <div>{index}{question.questionText}</div>
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Ansers</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {question.choices.map((choice) => <FormControlLabel key={choice} value={choice} control={<Radio/>}
                                                                    label={choice}/>)}
            </RadioGroup>
        </FormControl>

    </>
}