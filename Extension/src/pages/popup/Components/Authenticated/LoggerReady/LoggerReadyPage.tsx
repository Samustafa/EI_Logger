import {Logging} from "./Logging/Logging";
import {Paused} from "@pages/popup/Components/Authenticated/LoggerReady/Paused/Paused";
import {useState} from "react";
import {buttonDisabledStyle, buttonStyle} from "@pages/popup/Consts/Styles";
import {dataBase} from "@pages/popup/database";
import {loggingConstants} from "@pages/background/LoggingConstants";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";

export function LoggerReadyPage() {
    const [logging, setLogging] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleFinishedTask() {
        dataBase.doesTaskHasQuestionnaire(loggingConstants.taskId, 'post')
            .then((hasPostQuestionnaire) => navigate(hasPostQuestionnaire ? Paths.questionnairePage('post') : Paths.tasksPage))
            .catch((error) => console.error("LoggerReadyPage handleClick " + error));
    }

    function handleBackButton() {
        dataBase.doesTaskHasQuestionnaire(loggingConstants.taskId, 'pre')
            .then((hasPreQuestionnaire) => navigate(hasPreQuestionnaire ? Paths.questionnairePage('pre') : Paths.tasksPage))
            .catch((error) => console.error("LoggerReadyPage handleBackButton " + error));
    }

    return (
        <div>
            {logging && <Logging setLogging={setLogging}/>}
            {!logging && <Paused setLogging={setLogging}/>}
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