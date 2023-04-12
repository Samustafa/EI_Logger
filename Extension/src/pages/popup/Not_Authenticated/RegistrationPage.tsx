import React, {FormEvent, useState} from "react";
import {errorDivStyle, inputDefaultStyle, inputErrorStyle, registrationLabelStyle} from "@pages/popup/Consts/Styles";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {registerUser} from "@pages/popup/ServerAPI";

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

    /**
     * Extracts the server exception from response or extracts error message if server didn't respond
     * @param error
     */
    function extractAndSetError(error: any) {
        const serverException: IApiException = error.response?.data;
        setError(serverException ? serverException.message : error.message);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        disableButton();

        registerUser(registrationCode)
            .then((response) => navigate(Paths.idDisplayPage(response.data.code)))
            .catch((error) => extractAndSetError(error))
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
        minLength={31}
        value={registrationCode}
        onChange={event => {
            setRegistrationCode(event.target.value);
        }}
        form={"registrationForm"}
    />

    return (
        <>
            <form id={"registrationForm"} onSubmit={handleSubmit}>
                <label className={registrationLabelStyle} htmlFor="registrationCode">Registration Code:</label>
                {InputComponent}
                <LoadingButton text={'Submit'} loadingText={'Validating...'} isLoading={isValidating} type={'submit'}/>
            </form>

            {error && <div className={errorDivStyle} data-testid="error_text">{error}</div>}

            <LoadingButton text={'Back'} loadingText={'Validating...'} isLoading={isValidating} onClick={goBack}/>
        </>
    );
};