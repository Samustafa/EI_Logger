import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {dataBase} from "@pages/popup/database";
import {QuestionComponent} from "@pages/popup/Components/Authenticated/Questions/QuestionComponent";
import {IAnswer, IQuestion, IQuestionAnswer} from "@pages/popup/Interfaces";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";
import {extractAndSetError} from "@pages/popup/UtilityFunctions";
import {SuccessMessage} from "@pages/popup/SharedComponents/SuccessMessage";
import {v4 as uuidv4} from 'uuid';
import Paths from "@pages/popup/Consts/Paths";
import {buttonDisabledStyle, buttonStyle} from "@pages/popup/Consts/Styles";
import {fgLoggingConstants} from "@pages/popup/Consts/FgLoggingConstants";


export function QuestionnairePage() {
    const {questionnaireType} = useParams<string>();
    const taskId = fgLoggingConstants.taskId;
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

        const studyId = fgLoggingConstants.studyId;
        const userId = fgLoggingConstants.userId;
        const iAnswers = answers.map(answer => mapIQuestionAnswerToIAnswer(answer, studyId, userId));

        dataBase.submitQuestionnaire(taskId, iAnswers, questionnaireType)
            .then(() => dataBase.setQuestionnaireSubmitted(taskId, questionnaireType))
            .then(() => handlePostSubmit())
            .catch((error) => extractAndSetError(error, setError))
            .finally(() => setIsValidating(false));


    }

    function handleBack() {
        if (questionnaireType === 'pre') {
            dataBase.setExtensionState('TASKS_PAGE');
            navigate(Paths.tasksPage);
        } else {
            dataBase.setExtensionState('LOGGER_READY');
            navigate(Paths.loggerPage);
        }
    }

    function handleNext() {
        if (questionnaireType === 'pre') {
            dataBase.setExtensionState('LOGGER_READY');
            navigate(Paths.loggerPage);
        } else {
            dataBase.setExtensionState('TASKS_PAGE');
            navigate(Paths.tasksPage);
        }

    }

    function handlePostSubmit() {
        setIsSuccess(true);
        setIsNextDisabled(false);
    }

    function getTitle(questionnaireType: string | undefined) {
        return questionnaireType === 'pre' ? <h1>Pre Questionnaire</h1> : <h1>Post Questionnaire</h1>;
    }

    function getQuestions() {
        return iQuestions.map((iQuestion, index) =>
            <div key={iQuestion.questionId} className={"p-2 text-left"}>
                <QuestionComponent
                    index={index}
                    iQuestion={iQuestion}
                    setAnswers={setAnswers}
                    isValidating={isValidating}/>
            </div>);
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
            {getQuestions()}
            <LoadingButton text={"Submit"} loadingText={"Loading..."} isLoading={isValidating}
                           onClick={handleSubmit}/>

            <ErrorMessage error={error}/>
            <SuccessMessage isSuccess={isSuccess}/>
        </>
    );
}