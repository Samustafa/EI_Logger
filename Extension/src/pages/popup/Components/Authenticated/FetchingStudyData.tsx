import React, {useEffect, useState} from "react";
import {getStudy} from "@pages/popup/ServerAPI";
import {Backdrop, CircularProgress} from "@mui/material";
import {extractAndSetError} from "@pages/popup/UtilityFunctions";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";
import {useNavigate} from "react-router-dom";
import {dataBase} from "@pages/popup/database";
import {IQuestion, IStudy, ITask} from "@pages/popup/Interfaces";
import {Study} from "@pages/popup/model/Study";
import {Task} from "@pages/popup/model/Task";

export function FetchingStudyData() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    function fetchStudy() {
        setLoading(true);
        getStudy()
            .then((response) => saveStudyAndNavigate(new Study(response.data.studyId, response.data.name, response.data.tasks)))
            .catch(error => extractAndSetError(error, setError))
            .finally(() => setLoading(false));
    }

    useEffect(fetchStudy, [])

    function saveStudyAndNavigate(study: Study) {
        saveStudyInDB(study);
        // navigate(Paths.tasksPage);
    }

    function saveStudyInDB(studyData: Study) {
        const {study, tasks, questions} = extractStudyData(studyData);
        dataBase.study.add(study)
        dataBase.task.bulkAdd(tasks)
        dataBase.question.bulkAdd(questions)
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
        }))

        const questions: IQuestion[] = studyData.getIQuestions();

        return {study, tasks, questions}
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
        </>
    );
}