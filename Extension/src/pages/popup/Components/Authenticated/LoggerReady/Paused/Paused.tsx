import React from 'react';
import {PlayButton} from "./PlayButton";
import {display} from "@pages/popup/UtilityFunctions";
import {MessageType, Port, PortName} from "@pages/popup/Types";
import browser from "webextension-polyfill";

interface Props {
    setLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Paused({setLogging}: Props) {

    function addUrlListener() {

        const portInfo: PortName = {name: "port1"};
        const port = connectToPort(portInfo);

        const message: MessageType = {data: "message1"};
        port.postMessage(message);
        console.log("Sent message1")
    }

    function connectToPort(portInfo: PortName): Port {
        return browser.runtime.connect({name: portInfo.name})
    }

    function startLogging() {
        addUrlListener();
        setLogging(true);
    }

    return (
        <>
            {display("logger is offline")}
            <PlayButton onClick={() => startLogging()}/>
        </>
    );
}

