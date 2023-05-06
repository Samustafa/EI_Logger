import {MultipleChoiceQuestion} from "@pages/popup/model/question/MultipleChoiceQuestion";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {IQuestionAnswer} from "@pages/popup/Interfaces";
import {addOrUpdateAnswers} from "@pages/popup/UtilityFunctions";

interface Props {
    question: MultipleChoiceQuestion;
    index: number;
    setAnswers: Dispatch<SetStateAction<IQuestionAnswer[]>>;
    isValidating: boolean;
}

export function MultipleChoiceQuestionElement({question, index, setAnswers, isValidating}: Props) {
    const [value, setValue] = useState(question.choices[0]);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = (event.target as HTMLInputElement).value;
        setValue(answer);
        setAnswers((prev) => addOrUpdateAnswers(prev, {questionId: question.questionId, answer: answer}));
    };


    return <>
        <div>{index}{question.questionText}</div>
        <FormControl disabled={isValidating}>
            <FormLabel id="demo-controlled-radio-buttons-group">Answers</FormLabel>
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