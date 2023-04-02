import {FormEvent, useContext, useState} from "react";
import {buttonStyle, inputDefaultStyle, registrationLabelStyle} from "@pages/popup/Styles";
import {useActor} from "@xstate/react";
import {GlobalContextProvider} from "@pages/popup/GlobalContextProvider";

export default function RegistrationPage() {
    const authActor = useContext(GlobalContextProvider);
    const [, send] = useActor(authActor);

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
            <button className={buttonStyle} onClick={() => send('BACK')}>Back</button>
        </>
    );
};