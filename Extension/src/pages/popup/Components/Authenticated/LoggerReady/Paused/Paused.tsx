import React from 'react';
import {PlayButton} from "./PlayButton";
import {display, sendMessages} from "@pages/popup/UtilityFunctions";
import {Port} from "@pages/popup/Types";
import {dataBase} from "@pages/popup/database";

interface Props {
    setLogging: React.Dispatch<React.SetStateAction<boolean>>;
    port: Port;
}

export function Paused({setLogging, port}: Props) {

    function startLogging() {
        setLogging(true);
        sendMessages(port, "START_LOGGING");
        dataBase.logUserExtensionInteraction("STARTED:LOGGING");
    }

    return (
        <>
            {display("logger is offline")}
            <PlayButton onClick={() => startLogging()}/>
        </>
    );
}

