import {Logging} from "./Logging/Logging";
import {Paused} from "@pages/popup/Components/Authenticated/LoggerReady/Paused/Paused";
import {useEffect, useState} from "react";
import {buttonDisabledStyle, buttonStyle} from "@pages/popup/Consts/Styles";
import {dataBase} from "@pages/popup/database";
import {fgLoggingConstants} from "@pages/popup/Consts/FgLoggingConstants";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {connectToPort, extractAndSetError} from "@pages/popup/UtilityFunctions";
import {Port} from "@pages/popup/Types";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";

export function LoggerReadyPage() {
    const [logging, setLogging] = useState<boolean>(false);
    const [port, setPort] = useState<Port | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(function connectPort() {
        const port = connectToPort("loggingPort");
        setPort(port);
    }, [])

    function handleFinishedTask() {
        dataBase.doesTaskHasQuestionnaire(fgLoggingConstants.taskId, 'post')
            .then((hasPostQuestionnaire) => changeStateAndNavigate(hasPostQuestionnaire))
            .catch((error) => extractAndSetError(error, setError));

        function changeStateAndNavigate(hasPostQuestionnaire: boolean) {
            if (hasPostQuestionnaire) {
                dataBase.setExtensionState('POST_QUESTIONNAIRE');
                navigate(Paths.questionnairePage('post'));
            } else {
                dataBase.setExtensionState('TASKS_PAGE');
                navigate(Paths.tasksPage);
            }
        }

    }

    function handleBackButton() {
        dataBase.doesTaskHasQuestionnaire(fgLoggingConstants.taskId, 'pre')
            .then((hasPreQuestionnaire) => changeStateAndNavigate(hasPreQuestionnaire))
            .catch((error) => extractAndSetError(error, setError));

        function changeStateAndNavigate(hasPreQuestionnaire: boolean) {
            if (hasPreQuestionnaire) {
                dataBase.setExtensionState('PRE_QUESTIONNAIRE');
                navigate(Paths.questionnairePage('pre'));
            } else {
                dataBase.setExtensionState('TASKS_PAGE');
                navigate(Paths.tasksPage);
            }
        }

    }

    return (
        <div>
            {logging && <Logging setLogging={setLogging} setError={setError} port={port!}/>}
            {!logging && <Paused setLogging={setLogging} setError={setError} port={port!}/>}
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
                <ErrorMessage error={error}/>
            </div>
        </div>
    );
}