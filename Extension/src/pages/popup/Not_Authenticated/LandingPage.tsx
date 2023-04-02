import React, {useContext} from "react";
import {useActor} from "@xstate/react";
import {GlobalContextProvider} from "@pages/popup/GlobalContextProvider";
import {buttonStyle} from "@pages/popup/Styles";

export default function LandingPage(): JSX.Element {
    const authActor = useContext(GlobalContextProvider);
    const [, send] = useActor(authActor);

    function handleRegisterButton() {
        send('REGISTER')
    }

    return (
        <>
            <h2>welcome to the EI_Logger</h2>
            <button className={buttonStyle} onClick={handleRegisterButton}>Register</button>
        </>
    );
}