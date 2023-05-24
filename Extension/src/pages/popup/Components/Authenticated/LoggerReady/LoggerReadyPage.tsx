import {Logging} from "./Logging/Logging";
import {Paused} from "@pages/popup/Components/Authenticated/LoggerReady/Paused/Paused";
import {useEffect, useState} from "react";
import {buttonDisabledStyle, buttonStyle} from "@pages/popup/Consts/Styles";
import {dataBase} from "@pages/popup/database";
import {loggingConstants} from "@pages/popup/Consts/LoggingConstants";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {connectToPort} from "@pages/popup/UtilityFunctions";
import {Port} from "@pages/popup/Types";

export function LoggerReadyPage() {
    const [logging, setLogging] = useState<boolean>(false);
    const [port, setPort] = useState<Port | null>(null);
    const navigate = useNavigate();

    useEffect(function connectPort() {
        console.log("LoggerReadyPage connectPort");
        const port = connectToPort("port1");
        setPort(port);
    }, [])

    function handleFinishedTask() {
        dataBase.doesTaskHasQuestionnaire(loggingConstants.taskId, 'post')
            .then((hasPostQuestionnaire) => navigate(hasPostQuestionnaire ? Paths.questionnairePage('post') : Paths.tasksPage))
            .catch((error) => console.error("LoggerReadyPage handleFinishedTask " + error));
    }

    function handleBackButton() {
        dataBase.doesTaskHasQuestionnaire(loggingConstants.taskId, 'pre')
            .then((hasPreQuestionnaire) => navigate(hasPreQuestionnaire ? Paths.questionnairePage('pre') : Paths.tasksPage))
            .catch((error) => console.error("LoggerReadyPage handleBackButton " + error));
    }

    return (
        <div>
            {logging && <Logging setLogging={setLogging} port={port!}/>}
            {!logging && <Paused setLogging={setLogging} port={port!}/>}
            <div>
                <button className={logging ? buttonDisabledStyle : buttonStyle}
                        disabled={logging}
                        onClick={() => handleBackButton()}>
                    Back
                </button>
                <button className={logging ? buttonDisabledStyle : buttonStyle}
                        disabled={logging}
                        onClick={() => handleFinishedTask()}>
                    Finished Task
                </button>
            </div>
        </div>
    );
}