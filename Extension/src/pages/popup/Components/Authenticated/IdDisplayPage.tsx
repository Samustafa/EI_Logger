import {useParams} from "react-router-dom";
import CopyToClipboardButton from "@pages/popup/SharedComponents/CopyToClipboardButton";
import React from "react";

export function IdDisplayPage() {
    const {id} = useParams<string>();
    return (
        <>
            <p>Registration Successful!</p>
            <br/>
            <div className={"bg-green-300 border-double border-4 border-sky-500 grid grid-rows-1 grid-flow-col gap-4"}>
                <p className="text-green-600 font-bold">{id}</p>
                <CopyToClipboardButton textToCopy={id!}/>
            </div>

            <br/>
            <p>Please save your ID somewhere safe and don't share it with any person, even the people responsible for
                the study!</p>
            <p>You will need your ID, if you decide to log-in from another device!</p>
        </>
    );
}