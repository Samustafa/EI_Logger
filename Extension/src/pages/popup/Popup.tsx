import {Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import LandingPage from "@pages/popup/Components/Not_Authenticated/LandingPage";
import Paths from "@pages/popup/Consts/Paths";
import {generalStyle} from "@pages/popup/Consts/Styles";
import {IdDisplayPage} from "@pages/popup/Components/Authenticated/IdDisplayPage";
import {TasksPage} from "@pages/popup/Components/Authenticated/TasksPage";
import {FetchingStudyData} from "@pages/popup/Components/Authenticated/FetchingStudyData";
import {DemographicsPage} from "@pages/popup/Components/Authenticated/DemographicsPage";
import {LoggerReadyPage} from "@pages/popup/Components/Authenticated/LoggerReady/LoggerReadyPage";
import {QuestionnairePage} from "@pages/popup/Components/Authenticated/Questions/QuestionnairePage";
import {useLoggingConstants} from "@pages/popup/useLoggingConstants";
import {fgLoggingConstants} from "@pages/popup/Consts/FgLoggingConstants";
import {useExtensionState} from "@pages/popup/useExtensionState";

export default function Popup() {

    const navigate = useNavigate();

    const {userId, studyId, taskId} = useLoggingConstants();
    fgLoggingConstants.initialize(userId, studyId, taskId);

    const [hasNavigated, setHasNavigated] = React.useState<boolean>(false);
    const extensionState = useExtensionState() ?? 'NOT_AUTHENTICATED';
    console.log("extensionState: " + extensionState)
    if (!hasNavigated) {
        switch (extensionState) {
            case "DISPLAYING_ID":
                setHasNavigated(true);
                navigate(Paths.idDisplayPage);
                break;
            case "DEMOGRAPHICS":
                setHasNavigated(true);
                navigate(Paths.demographicsPage);
                break;
            case "TASKS_PAGE":
                setHasNavigated(true);
                navigate(Paths.tasksPage);
                break;
            case "PRE_QUESTIONNAIRE":
                setHasNavigated(true);
                navigate(Paths.questionnairePage('pre'));
                break;
            case "LOGGER_READY":
                setHasNavigated(true);
                navigate(Paths.loggerPage);
                break;
            case "LOGGING":
                setHasNavigated(true);
                navigate(Paths.loggerPage, {state: true});
                break;
            case "POST_QUESTIONNAIRE":
                setHasNavigated(true);
                navigate(Paths.questionnairePage('post'));
                break;
        }
    }
    console.log("render");

    return (
        <div className={generalStyle}>
            <Routes>
                <Route path={Paths.landingPage} element={<LandingPage/>}/>
                <Route path={Paths.idDisplayPage} element={<IdDisplayPage/>}/>
                <Route path={Paths.demographicsPage} element={<DemographicsPage/>}/>
                <Route path={Paths.tasksPage} element={<TasksPage/>}/>
                <Route path={Paths.fetchingStudyData} element={<FetchingStudyData/>}/>
                <Route path={Paths.defaultQuestionnaire} element={<QuestionnairePage/>}/>
                <Route path={Paths.loggerPage} element={<LoggerReadyPage/>}/>
            </Routes>
        </div>
    );
}