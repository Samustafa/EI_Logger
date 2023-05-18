import React from 'react';
import {PauseButton} from "./PauseButton";
import {display} from "@pages/popup/UtilityFunctions";

interface Props {
    setLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Logging({setLogging}: Props) {
    return (
        <div>
            {display("logger is online")}
            <PauseButton onClick={() => setLogging(false)}/>
        </div>
    );
}