import {Route, Routes} from "react-router-dom";
import React from "react";
import LandingPage from "@pages/popup/Components/Not_Authenticated/LandingPage";
import RegistrationPage from "@pages/popup/Components/Not_Authenticated/RegistrationPage";
import Paths from "@pages/popup/Consts/Paths";
import {generalStyle} from "@pages/popup/Consts/Styles";
import {IdDisplayPage} from "@pages/popup/Components/Authenticated/IdDisplayPage";
import {TasksPage} from "@pages/popup/Components/Authenticated/TasksPage";
import {FetchingStudyData} from "@pages/popup/Components/Authenticated/FetchingStudyData";


export default function Popup(): JSX.Element {
    return (
        <div className={generalStyle}>
            <Routes>
                <Route path={Paths.landingPage + "landingPage"} element={<LandingPage/>}/>
                <Route path={Paths.registrationPage} element={<RegistrationPage/>}/>
                <Route path={Paths.idDisplayPage()} element={<IdDisplayPage/>}/>
                <Route path={Paths.landingPage} element={<TasksPage/>}/>
                <Route path={Paths.landingPage} element={<FetchingStudyData/>}/>
            </Routes>
        </div>
    );
}