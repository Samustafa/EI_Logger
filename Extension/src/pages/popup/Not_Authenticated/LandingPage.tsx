import React, {useContext} from "react";
import {GlobalContextProvider} from "@pages/popup/GlobalContextProvider";
import {buttonStyle} from "@pages/popup/Consts/Styles";

export default function LandingPage(): JSX.Element {
    const machine = useContext(GlobalContextProvider);
    const {send} = machine;

    function gotoRegistrationPage() {
        send('REGISTER');
    }

    return (
        <>
            <h2>Welcome to the EI_Logger</h2>
            <button className={buttonStyle} onClick={gotoRegistrationPage}>Register</button>
        </>
    );
}