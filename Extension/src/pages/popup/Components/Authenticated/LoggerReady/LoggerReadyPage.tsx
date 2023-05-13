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

    function handleClick() {
        dataBase.doesTaskHasPostQuestionnaire(loggingConstants.taskId)
            .then((hasPostQuestionnaire) => navigate(hasPostQuestionnaire ? Paths.questionnairePage('post') : Paths.tasksPage))
            .catch((error) => console.error("LoggerReadyPage handleClick " + error));
    }

    return (
        <div>
            {logging && <Logging setLogging={setLogging}/>}
            {!logging && <Paused setLogging={setLogging}/>}
            <div>
                <button className={logging ? buttonDisabledStyle : buttonStyle}
                        disabled={logging}
                        onClick={() => handleClick()}>
                    Finished Task
                </button>
            </div>
        </div>
    );
}