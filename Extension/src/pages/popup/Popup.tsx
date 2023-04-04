import {Route, Routes} from "react-router-dom";
import React from "react";
import LandingPage from "@pages/popup/Not_Authenticated/LandingPage";
import RegistrationPage from "@pages/popup/Not_Authenticated/RegistrationPage";
import Paths from "@pages/popup/Consts/Paths";
import {generalStyle} from "@pages/popup/Consts/Styles";
import {IdDisplayPage} from "@pages/popup/Not_Authenticated/IdDisplayPage";


export default function Popup(): JSX.Element {
    return (
        <div className={generalStyle}>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path={Paths.registrationPage} element={<RegistrationPage/>}/>
                <Route path={Paths.idDisplayPage()} element={<IdDisplayPage/>}/>
            </Routes>
        </div>
    );
}