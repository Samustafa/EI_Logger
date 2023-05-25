import {useNavigate} from "react-router-dom";
import {fgLoggingConstants} from "@pages/popup/Consts/FgLoggingConstants";
import React, {useEffect} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import {ExtensionState} from "@pages/popup/Types";
import {dataBase} from "@pages/popup/database";
import Paths from "@pages/popup/Consts/Paths";

export function InitializationPage() {
    console.log("initializer");

    const navigate = useNavigate();

    useEffect(function assignStates() {
        dataBase.getLoggingConstants()
            .then((response) => fgLoggingConstants.initialize(response.userId, response.studyId, response.taskId))
            .then(() => dataBase.getExtensionState())
            .then((response) => navigateBasedOnExtensionState(response))
            .catch((err) => console.warn("couldn't get userId", err));

        function navigateBasedOnExtensionState(response: ExtensionState | undefined) {
            console.log("")
            console.log("userId", fgLoggingConstants.userId)
            console.log("studyId", fgLoggingConstants.studyId)
            console.log("taskId", fgLoggingConstants.taskId)
            console.log("")
            switch (response) {
                case "NOT_AUTHENTICATED":
                    navigate(Paths.landingPage);
                    break;
                case "DISPLAYING_ID":
                    navigate(Paths.idDisplayPage);
                    break;
                case "DEMOGRAPHICS":
                    navigate(Paths.demographicsPage);
                    break;
                case "TASKS_PAGE":
                    navigate(Paths.tasksPage);
                    break;
                case "PRE_QUESTIONNAIRE":
                    navigate(Paths.questionnairePage('pre'));
                    break;
                case "LOGGER_READY":
                    navigate(Paths.loggerPage);
                    break;
                case "LOGGING":
                    navigate(Paths.loggerPage, {state: true});
                    break;
                case "POST_QUESTIONNAIRE":
                    navigate(Paths.questionnairePage('post'));
                    break;
                default:
                    navigate(Paths.landingPage);
            }
        }


    }, []);

    // useEffect(function fetchStateAndNavigate() {
    //     dataBase.getExtensionState()
    //         .then((response) => navigateBasedOnExtensionState(response))
    //         .catch((err) => console.warn("couldn't get extension state", err));
    //
    //     function navigateBasedOnExtensionState(response: ExtensionState | undefined) {
    //         console.log("")
    //         console.log(fgLoggingConstants.userId)
    //         console.log(fgLoggingConstants.studyId)
    //         console.log(fgLoggingConstants.taskId)
    //         console.log("")
    //         switch (response) {
    //             case "NOT_AUTHENTICATED":
    //                 navigate(Paths.landingPage);
    //                 break;
    //             case "DISPLAYING_ID":
    //                 navigate(Paths.idDisplayPage);
    //                 break;
    //             case "DEMOGRAPHICS":
    //                 navigate(Paths.demographicsPage);
    //                 break;
    //             case "TASKS_PAGE":
    //                 navigate(Paths.tasksPage);
    //                 break;
    //             case "PRE_QUESTIONNAIRE":
    //                 navigate(Paths.questionnairePage('pre'));
    //                 break;
    //             case "LOGGER_READY":
    //                 navigate(Paths.loggerPage);
    //                 break;
    //             case "LOGGING":
    //                 navigate(Paths.loggerPage, {state: true});
    //                 break;
    //             case "POST_QUESTIONNAIRE":
    //                 navigate(Paths.questionnairePage('post'));
    //                 break;
    //             default:
    //                 navigate(Paths.landingPage);
    //         }
    //     }
    // }, []);


    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}