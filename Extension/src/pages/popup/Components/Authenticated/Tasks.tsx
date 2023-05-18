import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";
import {RightArrowIcon} from "@pages/popup/svg/RightArrowIcon";
import {Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ITask} from "@pages/popup/Interfaces";
import Paths from "@pages/popup/Consts/Paths";
import {loggingConstants} from "@pages/background/LoggingConstants";

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
        const hasPreQuestionnaire = doesTaskHasPreQuestionnaire(taskId);
        loggingConstants.taskId = taskId;
        if (hasPreQuestionnaire) navigate(Paths.questionnairePage('pre'));
        else navigate(Paths.loggerPage)
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