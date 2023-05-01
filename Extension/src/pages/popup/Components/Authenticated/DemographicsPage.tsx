import {inputDefaultStyle, inputErrorStyle} from "@pages/popup/Consts/Styles";
import React, {useState} from "react";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import CustomizedMenus from "@pages/popup/SharedComponents/CustomizedMenus";
import {ErrorMessage} from "@pages/popup/SharedComponents/ErrorMessage";
import dayjs from "dayjs";

export function DemographicsPage(): JSX.Element {
    const formId = "demographicsForm";
    const [isValidating,] = useState<boolean>(false);


    const birthDateInput = "birthDate";
    const [birthDate, setBirthDate] = useState<string>("");
    const [birthDateError, setBirthDateError] = useState<string>('');
    const birthDatePlaceHolder = "Insert Birth Date";
    const ageSection = <>
        <label htmlFor={birthDateInput}>Birth Date</label>
        <input
            form={formId}                      //to associate with the form
            id={birthDateInput}                 //to associate with the label
            className={birthDateError ? inputErrorStyle : inputDefaultStyle}
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            disabled={isValidating}
            type={"date"}
            placeholder={birthDatePlaceHolder}
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

    function isFormValid() {
        return isDateValid(birthDate) && isSexSelected() && job !== '';
    }

    function isSexSelected() {
        return sex !== 'sex'
    }

    function isDateValid(age: string) {
        const date = dayjs(age)
        return date.isValid() && date.isBefore(dayjs()) && date.isAfter(dayjs().subtract(100, 'year'));
    }

    function setCorrespondingError() {
        if (!isDateValid(birthDate)) setBirthDateError('Invalid Date')
        if (!isSexSelected()) setSexError(' Invalid Sex')
        if (job === '') setJobError(' Invalid Job')
    }

    function clearErrors() {
        setBirthDateError('')
        setSexError('')
        setJobError('')
    }

    function handleSubmit() {
        clearErrors();
        if (!isFormValid()) {
            setCorrespondingError();
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

            <ErrorMessage error={birthDateError + sexError + jobError}/>
        </>
    );
}


