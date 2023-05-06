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


export function PreQuestionnairePage() {
    const {taskId} = useParams<string>();
    const [iQuestions, setIQuestions] = useState<IQuestion[]>([]);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [answers, setAnswers] = useState<IQuestionAnswer[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(function fetchQuestions() {
        dataBase.getPreQuestionnaire(taskId ?? "")
            .then((questions) => setIQuestions(questions))
            .catch((error) => extractAndSetError(error, setError))
    }, [taskId])
    useEffect(function checkIfNextIsDisabled() {
        dataBase.isPreQuestionnaireSubmitted(taskId ?? "")
            .then((isSubmitted) => setIsNextDisabled(!isSubmitted))
            .catch((error) => extractAndSetError(error, setError))
    }, [taskId]);

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
            .then(() => dataBase.setPreQuestionnaireSubmitted(taskId ?? ""))
            .then(() => handlePostSubmit())
            .catch((error) => extractAndSetError(error, setError))
            .finally(() => setIsValidating(false));


    }

    function handleBack() {
        navigate(Paths.tasksPage);
    }

    function handleNext() {
        navigate(Paths.loggerPage());
    }

    function handlePostSubmit() {
        setIsSuccess(true);
        setIsNextDisabled(false);
    }

    return (
        <>
            <h1>Pre Questionnaire</h1>
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