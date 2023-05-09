import {Logging} from "./Logging/Logging";
import {Paused} from "@pages/popup/Components/Authenticated/LoggerReady/Paused/Paused";
import {useState} from "react";

export function LoggerReadyPage() {
    const [logging, setLogging] = useState<boolean>(false);
    return (
        <div>
            {logging && <Logging setLogging={setLogging}/>}
            {!logging && <Paused setLogging={setLogging}/>}
        </div>
    );
}