import React, {FormEvent, useState} from "react";
import {inputDefaultStyle, inputErrorStyle, registrationLabelStyle} from "@pages/popup/Consts/Styles";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {registerUser} from "@pages/popup/ServerAPI";
import {dataBase} from "@pages/popup/database";
import {AxiosResponse} from "axios";
import {IUser} from "@pages/popup/Interfaces";
import {extractAndSetError} from "@pages/popup/UtilityFunctions";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";

export default function RegistrationPage() {

    const [registrationCode, setRegistrationCode] = useState<string>("");
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    function disableButton() {
        setIsValidating(true);
    }

    function enableButton() {
        setIsValidating(false);
    }


    function saveToDBAndNavigate(response: AxiosResponse<IUser>) {
        const {userId} = response.data;
        console.log("saveToDBAndNavigate", userId)
        dataBase.user
            .add({userId: userId})
            .then(() => navigate(Paths.idDisplayPage(userId)))
            .catch((error) => extractAndSetError(error, setError));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        disableButton();

        registerUser(registrationCode)
            .then((response) => {
                console.log("handleSubmit", response.data)

                saveToDBAndNavigate(response)
            })
            .catch((error) => extractAndSetError(error, setError))
            .finally(() => enableButton());

    }

    function goBack() {
        navigate(Paths.landingPage);
    }

    const InputComponent = <input
        className={error ? inputErrorStyle : inputDefaultStyle}
        type="text"
        name="registrationCode"
        id="registrationCode"
        placeholder={"12345678-1234-1234-123456789ABC"}
        required={true}
        autoFocus={true}
        autoComplete={"one-time-code"}
        minLength={36}
        value={registrationCode}
        onChange={event => {
            setRegistrationCode(event.target.value);
        }}
        form={"registrationForm"}
        disabled={isValidating}
    />

    return (
        <>
            <form id={"registrationForm"} onSubmit={handleSubmit}>
                <label className={registrationLabelStyle} htmlFor="registrationCode">Registration Code:</label>
                {InputComponent}
                <LoadingButton text={'Submit'} loadingText={'Validating...'} isLoading={isValidating} type={'submit'}/>
            </form>

            <ErrorMessage error={error}/>

            <LoadingButton text={'Back'} loadingText={'Validating...'} isLoading={isValidating} onClick={goBack}/>
        </>
    );
};