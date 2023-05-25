import {useEffect, useState} from "react";
import {dataBase} from "@pages/popup/database";

export function useLoggingConstants() {

    const [userId, setUserId] = useState<string>("");
    const [studyId, setStudyId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    function setAllStates(userId: string, studyId: string, taskId: string) {
        setUserId(userId);
        setStudyId(studyId);
        setTaskId(taskId);
    }

    useEffect(function assignStates() {
        dataBase.getLoggingConstants()
            .then((response) => setAllStates(response.userId, response.studyId, response.taskId))
            .catch((err) => console.warn("couldn't get userId", err));
    }, []);

    return {userId, studyId, taskId};
}