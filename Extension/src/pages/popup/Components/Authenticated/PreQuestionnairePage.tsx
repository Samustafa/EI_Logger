import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {dataBase} from "@pages/popup/database";
import {QuestionElement} from "@pages/popup/Components/Authenticated/QuestionElement";
import {IAnswer, IQuestion, IQuestionAnswer} from "@pages/popup/Interfaces";
import {Paper} from "@mui/material";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";
import {extractAndSetError} from "@pages/popup/UtilityFunctions";
import {SuccessMessage} from "@pages/popup/SharedComponents/SuccessMessage";
import {v4 as uuidv4} from 'uuid';


export function PreQuestionnairePage() {
    const {taskId} = useParams<string>();
    const [iQuestions, setIQuestions] = useState<IQuestion[]>([]);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [answers, setAnswers] = useState<IQuestionAnswer[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);


    useEffect(function fetchQuestions() {
        dataBase.getPreQuestionnaire(taskId ?? "")
            .then((questions) => setIQuestions(questions))
            .catch((error) => extractAndSetError(error, setError))
    }, [taskId])

    function mapIQuestionAnswerToIAnswer(iQuestionAnswer: IQuestionAnswer, studyId: string, userId: string): IAnswer {
        return {
            answerId: uuidv4(),
            questionId: iQuestionAnswer.questionId,
            taskId: taskId ?? "",
            answer: iQuestionAnswer.answer,
            studyId: studyId,
            userId: userId
        }
    }


    async function handleSubmit() {
        setIsValidating(true);
        setError("");
        setIsSuccess(false);

        const studyId = await dataBase.getStudyId();
        const userId = await dataBase.getUserId();
        const iAnswers = answers.map(answer => mapIQuestionAnswerToIAnswer(answer, studyId, userId));

        dataBase.submitPreQuestionnaire(taskId ?? "", iAnswers)
            .then(() => setIsSuccess(true))
            .catch((error) => extractAndSetError(error, setError))
            .finally(() => setIsValidating(false));
    }

    return (
        <>
            <h1>Pre Questionnaire</h1>
            <LoadingButton text={"back"} loadingText={"Loading..."} isLoading={isValidating}/>
            <Paper style={{maxHeight: 200, overflow: 'auto', backgroundColor: '#FFFFFF'}}>
                {iQuestions.map((iQuestion, index) => <QuestionElement key={iQuestion.questionId}
                                                                       index={index}
                                                                       iQuestion={iQuestion}
                                                                       setAnswers={setAnswers}
                                                                       isValidating={isValidating}/>)}
                <LoadingButton text={"Submit"} loadingText={"Loading..."} isLoading={isValidating}
                               onClick={handleSubmit}/>
            </Paper>
            <ErrorMessage error={error}/>
            <SuccessMessage isSuccess={isSuccess}/>
        </>
    );
}