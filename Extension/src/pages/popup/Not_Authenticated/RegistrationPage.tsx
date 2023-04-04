import {FormEvent, useState} from "react";
import {buttonStyle, inputDefaultStyle, registrationLabelStyle} from "@pages/popup/Consts/Styles";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {validateRegistrationCode} from "@pages/popup/ServerAPI";

export default function RegistrationPage() {

    const [registrationCode, setRegistrationCode] = useState<string>("");
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsValidating(true);
        validateRegistrationCode(registrationCode).then((response) => {

        });
    }


    const InputComponent = () => {
        return <input
            className={inputDefaultStyle}
            type="text"
            name="registrationCode"
            id="registrationCode"
            placeholder={"12345-1234-1234-12345"}
            required={true}
            autoFocus={true}
            autoComplete={"one-time-code"}
            minLength={3}
            value={registrationCode}
            onChange={event => {
                setRegistrationCode(event.target.value);
            }}
            form={"registrationForm"}
            onInvalid={() => {
            }}
        />
    }
    return (
        <>
            <form id={"registrationForm"} onSubmit={handleSubmit}>
                <label className={registrationLabelStyle} htmlFor="registrationCode">Registration Code:</label>
                <InputComponent/>
                <button type={"submit"} className={buttonStyle}
                        disabled={isValidating}>{isValidating ? 'validating...' : 'Submit'}</button>
            </form>
            <button className={buttonStyle}
                    onClick={() => navigate(Paths.landingPage)}
                    disabled={isValidating}>{isValidating ? 'validating...' : 'Back'}
            </button>
        </>
    );
};