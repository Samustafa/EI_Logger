import React from "react";
import {buttonStyle} from "@pages/popup/Consts/Styles";

export default function LandingPage(): JSX.Element {
    return (
        <>
            <h2>Welcome to the EI_Logger</h2>
            <button className={buttonStyle} onClick={() => {
            }}>Register
            </button>
        </>
    );
}