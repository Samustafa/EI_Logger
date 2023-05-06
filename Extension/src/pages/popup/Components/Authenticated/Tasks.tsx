import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";
import {RightArrowIcon} from "@pages/popup/svg/RightArrowIcon";
import {Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ITask} from "@pages/popup/Interfaces";
import Paths from "@pages/popup/Consts/Paths";

interface Props {
    iTasks: ITask[];
}

export function Tasks({iTasks}: Props) {
    const navigate = useNavigate();

    function getTaskById(taskId: string) {
        const defaultITask: ITask = {
            taskId: "",
            text: "",
            isPreQuestionsSubmitted: false,
            isPostQuestionsSubmitted: false,
            iPreQuestions: [],
            iPostQuestions: []
        }
        return iTasks.find((task) => task.taskId === taskId) ?? defaultITask;
    }

    function handleListItemClick(taskId: string) {
        const task = getTaskById(taskId);
        const hasPreQuestionnaire = task.iPreQuestions.length > 0;
        if (hasPreQuestionnaire) navigate(Paths.preQuestionnairePage(taskId));
        else navigate(Paths.loggerPage(taskId))
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