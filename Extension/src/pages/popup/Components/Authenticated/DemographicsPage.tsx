import {inputDefaultStyle, inputErrorStyle} from "@pages/popup/Consts/Styles";
import React, {useState} from "react";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import CustomizedMenus from "@pages/popup/SharedComponents/CustomizedMenus";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";
import dayjs from "dayjs";

export function DemographicsPage(): JSX.Element {
    const formId = "demographicsForm";
    const [isValidating,] = useState<boolean>(false);


    const ageInput = "ageInput";
    const [age, setAge] = useState<string>("");
    const [ageError, setAgeError] = useState<string>('');
    const agePlaceHolder = "Insert Age";
    const ageSection = <>
        <label htmlFor={ageInput}>Age</label>
        <input
            form={formId}                      //to associate with the form
            id={ageInput}                 //to associate with the label
            className={ageError ? inputErrorStyle : inputDefaultStyle}
            value={age}
            onChange={(event) => setAge(event.target.value)}
            disabled={isValidating}
            type={"date"}
            placeholder={agePlaceHolder}
            autoFocus={true}
        />
    </>

    const jobInput = "jobInput";
    const [job, setJob] = useState<string>("");
    const [jobError, setJobError] = useState<string>('');

    const jobPlaceHolder = "Insert Job";

    const jobSection = <>
        <label htmlFor={jobInput}>Job</label>
        <input
            form={formId}                      //to associate with the form
            id={jobInput}                 //to associate with the label
            className={jobError ? inputErrorStyle : inputDefaultStyle}
            value={job}
            onChange={(event) => setJob(event.target.value)}
            disabled={isValidating}
            type={"text"}
            placeholder={jobPlaceHolder}
        />
    </>

    const [sex, setSex] = useState<"m" | "f" | "sex">("sex")
    const [sexError, setSexError] = useState<string>('');
    const sexSection = <>
        <label>Choose Sex</label>
        <CustomizedMenus sex={sex} setSex={setSex} error={Boolean(sexError)}/>
    </>

    function isSexSelected() {
        return sex !== 'sex'
    }

    function isDateValid(age: string) {
        const date = dayjs(age)
        return date.isValid() && date.isBefore(dayjs()) && date.isAfter(dayjs().subtract(100, 'year'));
    }

    function isFormValid() {
        return isDateValid(age) && isSexSelected() && job !== '';
    }

    function setCorrespondingError() {
        if (!isDateValid(age)) setAgeError('Invalid Date')
        if (!isSexSelected()) setSexError(' Invalid Sex')
        if (job === '') setJobError(' Invalid Job')
    }

    function clearErrors() {
        setAgeError('')
        setSexError('')
        setJobError('')
    }

    function handleSubmit() {
        clearErrors();
        if (!isFormValid()) {
            console.log('invalid form')
            setCorrespondingError();
            console.log(ageError)
            return
        }

    }

    return (
        <>
            <form id={formId}>
                {ageSection}
                <br/>
                {jobSection}
                <br/>
                {sexSection}
                <br/>
                <LoadingButton text={'Submit'} loadingText={'Validating...'} isLoading={isValidating} type={'button'}
                               onClick={handleSubmit}/>
            </form>

            <ErrorMessage error={ageError + sexError + jobError}/>
        </>
    );
}


