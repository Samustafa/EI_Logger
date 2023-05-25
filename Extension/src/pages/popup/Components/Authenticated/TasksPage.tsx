import {dataBase} from "@pages/popup/database";
import * as React from "react";
import {useEffect, useState} from "react";
import {ITask} from "@pages/popup/Interfaces";
import {useNavigate} from "react-router-dom";
import {fgLoggingConstants} from "@pages/popup/Consts/FgLoggingConstants";
import Paths from "@pages/popup/Consts/Paths";
import {Paper} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {RightArrowIcon} from "@pages/popup/svg/RightArrowIcon";

export function TasksPage() {

    const [iTasks, setITasks] = useState<ITask[]>([]);
    useEffect(function fetchTasks() {
        dataBase.getITasks().then((iTasks) => {
            setITasks(iTasks);
        }).catch((error) => console.log(error));
    }, []);


    return (
        <div>
            <h1>Tasks</h1>
            <Tasks iTasks={iTasks}/>
        </div>
    );

}


interface Props {
    iTasks: ITask[];
}

export function Tasks({iTasks}: Props) {
    const navigate = useNavigate();

    function doesTaskHasPreQuestionnaire(taskId: string) {
        const defaultITask: ITask = {
            taskId: "",
            text: "",
            isPreQuestionsSubmitted: false,
            isPostQuestionsSubmitted: false,
            iPreQuestions: [],
            iPostQuestions: []
        }
        const iTask = iTasks.find((task) => task.taskId === taskId) ?? defaultITask;
        return iTask.iPreQuestions.length > 0;
    }

    function handleListItemClick(taskId: string) {
        fgLoggingConstants.taskId = taskId;
        dataBase.setCurrentTaskId(taskId);

        const hasPreQuestionnaire = doesTaskHasPreQuestionnaire(taskId);
        if (hasPreQuestionnaire) {
            dataBase.setExtensionState('PRE_QUESTIONNAIRE');
            navigate(Paths.questionnairePage('pre'));
        } else {
            dataBase.setExtensionState('LOGGER_READY');
            navigate(Paths.loggerPage);
        }
    }

    return (
        <>
            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List component="nav" aria-label="main mailbox folders">
                    {iTasks.map((iTask: ITask) =>
                        (<ListItemButton key={iTask.taskId} onClick={() => handleListItemClick(iTask.taskId)}>
                            <ListItemText primary={iTask.text}/><RightArrowIcon/>
                        </ListItemButton>))}
                </List>
            </Paper>

        </>
    );
}