import {Route, Routes} from "react-router-dom";
import React from "react";
import LandingPage from "@pages/popup/Not_Authenticated/LandingPage";
import RegistrationPage from "@pages/popup/Not_Authenticated/RegistrationPage";
import Paths from "@pages/popup/Consts/Paths";
import {generalStyle} from "@pages/popup/Consts/Styles";
import {GlobalStateProvider} from "@pages/popup/GlobalContextProvider";


export default function Popup(): JSX.Element {
    return (
        <div className={generalStyle}>
            <GlobalStateProvider>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path={Paths.registrationPage} element={<RegistrationPage/>}/>
                </Routes>
            </GlobalStateProvider>
        </div>
    );
}