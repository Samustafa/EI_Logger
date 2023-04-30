import React, {useEffect, useState} from "react";
import {getStudy} from "@pages/popup/ServerAPI";
import {Backdrop, CircularProgress} from "@mui/material";
import {extractAndSetError} from "@pages/popup/UtilityFunctions";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";
import {useNavigate} from "react-router-dom";
import {dataBase} from "@pages/popup/database";
import {
    IMultipleChoiceQuestion,
    IQuestion,
    IRangeQuestion,
    IStudy,
    ITask,
    ITextQuestion
} from "@pages/popup/Interfaces";
import {Study} from "@pages/popup/model/Study";
import {Task} from "@pages/popup/model/Task";
import Paths from "@pages/popup/Consts/Paths";

export function FetchingStudyData() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [retryFlag, setRetryFlag] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(fetchStudy, [retryFlag])

    function fetchStudy() {
        setLoading(true);
        getStudy()
            .then((response) => saveStudyAndNavigate(new Study(response.data.studyId, response.data.name, response.data.tasks)))
            .catch(error => extractAndSetError(error, setError))
            .finally(() => setLoading(false));
    }

    function saveStudyAndNavigate(study: Study) {
        saveStudyInDB(study);
        navigate(Paths.tasksPage);
    }

    function saveStudyInDB(studyData: Study) {
        const {
            study,
            tasks,
            multipleChoiceQuestions,
            textQuestions,
            rangeQuestions
        } = extractStudyData(studyData);

        dataBase.study.add(study)
        dataBase.task.bulkAdd(tasks)
        dataBase.multipleChoiceQuestion.bulkAdd(multipleChoiceQuestions);
        dataBase.textQuestion.bulkAdd(textQuestions);
        dataBase.rangeQuestion.bulkAdd(rangeQuestions);
    }

    function extractStudyData(studyData: Study) {
        const study: IStudy = {
            studyId: studyData.studyId,
            name: studyData.name,
        }

        const tasks = studyData.tasks.map((task: Task): ITask => ({
            taskId: task.taskId,
            text: task.text,
            hasPostQuestionnaire: task.hasPostQuestionnaire,
            hasPreQuestionnaire: task.hasPreQuestionnaire,
            iPreQuestions: task.getIPreQuestions(),
            iPostQuestions: task.getIPostQuestions(),
        }))

        const questions: IQuestion[] = studyData.getIQuestions();
        const multipleChoiceQuestions = questions.filter(question => question.type === "MultipleChoiceQuestion") as IMultipleChoiceQuestion[]
        const textQuestions = questions.filter(question => question.type === "TextQuestion") as ITextQuestion[]
        const rangeQuestions = questions.filter(question => question.type === "RangeQuestion") as IRangeQuestion[]

        return {study, tasks, multipleChoiceQuestions, textQuestions, rangeQuestions}
    }

    function retry() {
        setRetryFlag(!retryFlag)
    }

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <ErrorMessage error={error}/>
            {error && <button onClick={retry}>Retry</button>}
        </>
    );
}