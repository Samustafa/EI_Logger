import React, {FormEvent, useState} from "react";
import {errorDivStyle, input36Style} from "@pages/popup/Consts/Styles";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {login, registerUser} from "@pages/popup/ServerAPI";
import {dataBase} from "@pages/popup/database";
import {AxiosResponse} from "axios";
import {IApiException, IUser} from "@pages/popup/Interfaces";
import {Input36Component} from "@pages/popup/SharedComponents/Input36Component";

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

    /**
     * Extracts the server exception from response or extracts error message if server didn't respond
     * @param error
     */
    function extractAndSetRegistrationError(error: any) {
        const serverException: IApiException = error.response?.data;
        setRegistrationError(serverException ? serverException.message : error.message);
    }

    function saveToDBAndNavigate(response: AxiosResponse<IUser>) {
        const {userId} = response.data;
        console.log("saveToDBAndNavigate", userId)
        dataBase.user.add({userId: userId})
            .then(() => {
                navigate(Paths.idDisplayPage(userId))
            }).catch((error) => extractAndSetRegistrationError(error));
    }

    function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearErrors();
        disableButtons();
        setUserId("");

        registerUser(registrationCode)
            .then(response => saveToDBAndNavigate(response))
            .catch(error => extractAndSetRegistrationError(error))
            .finally(() => enableButtons());

    }

    function extractAndSetLoginError(error: any) {
        const serverException: IApiException = error.response?.data;
        setLoginError(serverException ? serverException.message : error.message);
    }

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearErrors();
        disableButtons();
        setRegistrationCode("");

        login(userId)
            .then(() => navigate("not implemented"))
            .catch((error) => extractAndSetLoginError(error))
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
};