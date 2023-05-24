import {useNavigate, useParams} from "react-router-dom";
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
import Paths from "@pages/popup/Consts/Paths";
import {buttonDisabledStyle, buttonStyle} from "@pages/popup/Consts/Styles";
import {loggingConstants} from "@pages/popup/Consts/LoggingConstants";


export function QuestionnairePage() {
    const {questionnaireType} = useParams<string>();
    const taskId = loggingConstants.taskId;
    const [iQuestions, setIQuestions] = useState<IQuestion[]>([]);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [answers, setAnswers] = useState<IQuestionAnswer[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(function fetchQuestions() {
        dataBase.getQuestionnaire(taskId, questionnaireType)
            .then((questions) => setIQuestions(questions))
            .catch((error) => extractAndSetError(error, setError))
    }, [taskId])
    useEffect(function isNextButtonDisabled() {
        dataBase.isQuestionnaireSubmitted(taskId, questionnaireType)
            .then((isSubmitted) => setIsNextDisabled(!isSubmitted))
            .catch((error) => extractAndSetError(error, setError))
    }, [taskId]);

    function mapIQuestionAnswerToIAnswer(iQuestionAnswer: IQuestionAnswer, studyId: string, userId: string): IAnswer {
        return {
            answerId: uuidv4(),
            questionId: iQuestionAnswer.questionId,
            taskId: taskId,
            answer: iQuestionAnswer.answer,
            studyId: studyId,
            userId: userId
        }
    }

    async function handleSubmit() {
        setIsValidating(true);
        setError("");
        setIsSuccess(false);

        const studyId = loggingConstants.studyId;
        const userId = loggingConstants.userId;
        const iAnswers = answers.map(answer => mapIQuestionAnswerToIAnswer(answer, studyId, userId));

        dataBase.submitQuestionnaire(taskId, iAnswers, questionnaireType)
            .then(() => dataBase.setQuestionnaireSubmitted(taskId, questionnaireType))
            .then(() => handlePostSubmit())
            .catch((error) => extractAndSetError(error, setError))
            .finally(() => setIsValidating(false));


    }

    function handleBack() {
        navigate(questionnaireType === 'pre' ? Paths.tasksPage : Paths.loggerPage);
    }

    function handleNext() {
        navigate(questionnaireType === 'pre' ? Paths.loggerPage : Paths.tasksPage);
    }

    function handlePostSubmit() {
        setIsSuccess(true);
        setIsNextDisabled(false);
    }

    function getTitle(questionnaireType: string | undefined) {
        return questionnaireType === 'pre' ? <h1>Pre Questionnaire</h1> : <h1>Post Questionnaire</h1>;
    }

    return (
        <>
            {getTitle(questionnaireType)}
            <LoadingButton text={"back"} loadingText={"Loading..."} isLoading={isValidating} onClick={handleBack}/>
            <button className={isNextDisabled ? buttonDisabledStyle : buttonStyle}
                    onClick={handleNext}
                    disabled={isNextDisabled}>
                Next
            </button>
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