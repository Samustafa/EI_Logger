import React from "react";
import {buttonStyle} from "@pages/popup/Consts/Styles";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";

export default function LandingPage(): JSX.Element {
    const navigate = useNavigate();
    return (
        <>
            <h2>Welcome to the EI_Logger</h2>
            <button className={buttonStyle} onClick={() => navigate(Paths.registrationPage)}>Register</button>
        </>
    );
}