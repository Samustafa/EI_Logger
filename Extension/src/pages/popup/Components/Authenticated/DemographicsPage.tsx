import {inputDefaultStyle, inputErrorStyle} from "@pages/popup/Consts/Styles";
import React, {useState} from "react";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import CustomizedMenus from "@pages/popup/SharedComponents/CustomizedMenus";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";

export function DemographicsPage(): JSX.Element {
    const formId = "demographicsForm";
    const [isValidating,] = useState<boolean>(false);
    const [error,] = useState<string | null>(null);


    const ageInput = "ageInput";
    const [age, setAge] = useState<string>("");
    const agePlaceHolder = "Insert Age";
    const ageSection = <>
        <label htmlFor={ageInput}>First Name</label>
        <input
            form={formId}                      //to associate with the form
            id={ageInput}                 //to associate with the label
            className={error ? inputErrorStyle : inputDefaultStyle}
            value={age}
            onChange={onAgeChange}
            disabled={isValidating}
            type={"text"}
            placeholder={agePlaceHolder}
            autoFocus={true}
        />
    </>

    function onAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const enteredValue = event.target.value;
        const valueIsNumber = !isNaN(Number(enteredValue));
        if (valueIsNumber) setAge(enteredValue);
    }


    const jobInput = "jobInput";
    const [job, setJob] = useState<string>("");
    const jobPlaceHolder = "Insert Sex";

    const jobSection = <>
        <label htmlFor={jobInput}>Job</label>
        <input
            form={formId}                      //to associate with the form
            id={jobInput}                 //to associate with the label
            className={error ? inputErrorStyle : inputDefaultStyle}
            value={job}
            onChange={(event) => setJob(event.target.value)}
            disabled={isValidating}
            type={"text"}
            placeholder={jobPlaceHolder}
        />
    </>

    const [sex, setSex] = useState<"m" | "f" | "sex">("sex")
    const sexSection = <>
        <label>Choose Sex</label>
        <CustomizedMenus sex={sex} setSex={setSex}/>
    </>

    function handleSubmit() {
        console.log("submitting")
    }

    return (
        <>

            <form id={formId} onSubmit={handleSubmit}>
                {ageSection}
                <br/>
                {jobSection}
                <br/>
                {sexSection}
                <br/>
                <LoadingButton text={'Submit'} loadingText={'Validating...'} isLoading={isValidating} type={'button'}/>
            </form>

            <ErrorMessage error={error}/>
        </>
    );


}


