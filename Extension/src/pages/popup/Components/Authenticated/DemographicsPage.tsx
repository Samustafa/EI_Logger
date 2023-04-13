import {inputDefaultStyle, inputErrorStyle} from "@pages/popup/Consts/Styles";
import React, {useState} from "react";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";

export function DemographicsPage(): JSX.Element {
    const formId = "demographicsForm";
    const [isValidating,] = useState<boolean>(false);
    const [error,] = useState<string | null>(null);


    const firstInputId = "firstInput";
    const [firstValue, setFirstValue] = useState<string>("");
    const firstPlaceholder = "First Placeholder";

    const secondInputId = "secondInput";
    const [secondValue,] = useState<string>("");
    const secondPlaceholder = "Second Placeholder";

    function handleSubmit() {
        console.log("submitting")
    }

    const firstSection = <>
        <label htmlFor={firstInputId}>First Name</label>
        <input
            form={formId}                      //to associate with the form
            id={firstInputId}                 //to associate with the label
            className={error ? inputErrorStyle : inputDefaultStyle}
            value={firstValue}
            onChange={(event) => setFirstValue(event.target.value)}
            disabled={isValidating}
            type={"text"}
            placeholder={firstPlaceholder}
            autoFocus={true}
        />
    </>
    const secondSection = <>
        <label htmlFor={secondInputId}>Second Name</label>
        <input
            form={formId}                      //to associate with the form
            id={secondInputId}                 //to associate with the label
            className={error ? inputErrorStyle : inputDefaultStyle}
            value={secondValue}
            onChange={(event) => setFirstValue(event.target.value)}
            disabled={isValidating}
            type={"text"}
            placeholder={secondPlaceholder}
        />
    </>

    return (
        <>

            <form id={formId} onSubmit={handleSubmit}>
                {firstSection}
                <br/>
                {secondSection}
                <LoadingButton text={'Submit'} loadingText={'Validating...'} isLoading={isValidating} type={'submit'}/>
            </form>

            {error && <p>{error}</p>}
        </>
    );


}