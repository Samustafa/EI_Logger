import {Route, Routes} from "react-router-dom";
import React from "react";
import LandingPage from "@pages/popup/Components/Not_Authenticated/LandingPage";
import Paths from "@pages/popup/Consts/Paths";
import {generalStyle} from "@pages/popup/Consts/Styles";
import {IdDisplayPage} from "@pages/popup/Components/Authenticated/IdDisplayPage";
import {TasksPage} from "@pages/popup/Components/Authenticated/TasksPage";
import {FetchingStudyData} from "@pages/popup/Components/Authenticated/FetchingStudyData";
import {DemographicsPage} from "@pages/popup/Components/Authenticated/DemographicsPage";
import {LoggerReadyPage} from "@pages/popup/Components/Authenticated/LoggerReady/LoggerReadyPage";
import {QuestionnairePage} from "@pages/popup/Components/Authenticated/QuestionnairePage";
import {dataBase} from "@pages/popup/database";
import {fgLoggingConstants} from "@pages/popup/Consts/FgLoggingConstants";

export default function Popup() {
    function initializeFGLoggingConstants() {
        dataBase.getLoggingConstants()
            .then((response) => fgLoggingConstants.initialize(response.userId, response.studyId))
            .catch((err) => console.warn("Couldn't initialize LoggingConstants", err));
    }

    initializeFGLoggingConstants();

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