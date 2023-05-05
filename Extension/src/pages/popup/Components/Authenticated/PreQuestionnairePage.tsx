import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {dataBase} from "@pages/popup/database";
import {QuestionElement} from "@pages/popup/Components/Authenticated/QuestionElement";
import {IQuestion} from "@pages/popup/Interfaces";
import {Paper} from "@mui/material";

export function PreQuestionnairePage() {
    const {taskId} = useParams<string>();
    const [iQuestions, setIQuestions] = useState<IQuestion[]>([]);


    useEffect(function fetchQuestions() {
        dataBase.getPreQuestionnaire(taskId ?? "")
            .then((questions) => setIQuestions(questions))
            .catch((error) => console.log(error))
    }, [taskId])

    return (
        <>
            <h1>Pre Questionnaire</h1>
            <Paper style={{maxHeight: 200, overflow: 'auto', backgroundColor: '#FFFFFF'}}>
                {iQuestions.map((iQuestion, index) => <QuestionElement key={iQuestion.questionId} index={index}
                                                                       iQuestion={iQuestion}/>)}
            </Paper>
        </>
    );
}