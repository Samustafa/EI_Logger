import {useEffect, useState} from "react";
import {ExtensionState} from "@pages/popup/Types";
import {dataBase} from "@pages/popup/database";

export function useExtensionState() {
    const [extensionState, setExtensionState] = useState<ExtensionState | undefined>();

    useEffect(function assignState() {
        dataBase.getExtensionState()
            .then((response) => setExtensionState(response))
            .catch((err) => console.warn("couldn't get extension state", err));
    }, []);

    return extensionState;
}