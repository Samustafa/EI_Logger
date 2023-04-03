import {FormEvent, useState} from "react";
import {buttonStyle, inputDefaultStyle, registrationLabelStyle} from "@pages/popup/Consts/Styles";

export default function RegistrationPage() {

    const [registrationCode, setRegistrationCode] = useState<string>("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
            <h2>Registration</h2>
            <form id={"registrationForm"} onSubmit={handleSubmit}>
                <label className={registrationLabelStyle} htmlFor="registrationCode">Registration Code:</label>
                <InputComponent/>
                <button type={"submit"} className={buttonStyle}>Submit</button>
            </form>
            <button className={buttonStyle} onClick={() => {
            }}>Back
            </button>
        </>
    );
};