import React from 'react';
import {PauseButton} from "./PauseButton";
import {display, sendMessages} from "@pages/popup/UtilityFunctions";
import {Port} from "@pages/popup/Types";
import {dataBase} from "@pages/popup/database";

interface Props {
    setLogging: React.Dispatch<React.SetStateAction<boolean>>;
    port: Port;
}

export function Logging({setLogging, port}: Props) {

    function stopLogging() {
        setLogging(false);
        sendMessages(port, "STOP_LOGGING");
        dataBase.logUserExtensionInteraction("STOPPED:LOGGING");
    }

    return (
        <div>
            {display("logger is online")}
            <PauseButton onClick={() => stopLogging()}/>
        </div>
    );
}