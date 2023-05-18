import React, {FormEvent, useState} from "react";
import {errorDivStyle, input36Style} from "@pages/popup/Consts/Styles";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {login, registerUser} from "@pages/popup/ServerAPI";
import {dataBase} from "@pages/popup/database";
import {Input36Component} from "@pages/popup/SharedComponents/Input36Component";
import {extractAndSetError} from "@pages/popup/UtilityFunctions";
import {loggingConstants} from "@pages/background/LoggingConstants";
//99746344-7382-4d7c-9e60-6ed3a3cef427
export default function LandingPage() {

    const [userId, setUserId] = useState<string>("");
    const [loginError, setLoginError] = useState<string | null>(null);


    const [registrationCode, setRegistrationCode] = useState<string>("");
    const [registrationError, setRegistrationError] = useState<string | null>(null);

    const [isValidating, setIsValidating] = useState<boolean>(false);

    const navigate = useNavigate();

    const registrationForm = "registrationForm";
    const loginForm = "loginForm";

    function disableButtons() {
        setIsValidating(true);
    }

    function enableButtons() {
        setIsValidating(false);
    }

    function clearErrors() {
        setRegistrationError(null);
        setLoginError(null);
    }


    function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearErrors();
        disableButtons();
        setUserId("");

        registerUser(registrationCode)
            .then(iUser => {
                dataBase.addUserToDataBase(iUser) //TODO: add try catch on original function to throw more comprehensive custom errors
                dataBase.logUserExtensionInteraction("SIGNED:UP");
                loggingConstants.userId = iUser.userId;
            })
            .then(() => navigate(Paths.idDisplayPage))
            .catch(error => extractAndSetError(error, setRegistrationError))
            .finally(() => enableButtons());

    }

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearErrors();
        disableButtons();
        setRegistrationCode("");

        login(userId)
            .then(() => {
                dataBase.logUserExtensionInteraction("SIGNED:IN");
                loggingConstants.userId = userId;
            })
            .then(() => navigate(Paths.fetchingStudyData))
            .catch((error) => extractAndSetError(error, setLoginError))
            .finally(() => enableButtons());
    }

    return (
        <>
            <form id={loginForm} onSubmit={handleLogin}>
                <label className={input36Style} htmlFor={loginForm}>User ID:</label>
                <Input36Component isError={!!loginError}
                                  value={userId}
                                  changeValue={setUserId}
                                  isDisabled={isValidating}
                                  name={loginForm}/>
                <LoadingButton text={'Login'} loadingText={'Validating...'} isLoading={isValidating} type={'submit'}/>
            </form>

            <form id={registrationForm} onSubmit={handleRegister}>
                <label className={input36Style} htmlFor={registrationForm}>Registration Code:</label>
                <Input36Component isError={!!registrationError}
                                  value={registrationCode}
                                  changeValue={setRegistrationCode}
                                  isDisabled={isValidating}
                                  name={registrationForm}/>
                <LoadingButton text={'Register'} loadingText={'Validating...'} isLoading={isValidating}
                               type={'submit'}/>
            </form>

            {registrationError &&
                <div className={errorDivStyle} data-testid="error_text">{registrationError}</div>}
            {loginError &&
                <div className={errorDivStyle} data-testid="error_text">{loginError}</div>}
        </>
    );
}