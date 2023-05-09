import React from 'react';
import {PlayButton} from "./PlayButton";
import {display} from "@pages/popup/UtilityFunctions";

interface Props {
    setLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Paused({setLogging}: Props) {
    return (
        <>
            {display("logger is offline")}
            <PlayButton onClick={() => setLogging(true)}/>
        </>
    );
}

