import {inputDefaultStyle, inputErrorStyle} from "@pages/popup/Consts/Styles";
import React from "react";

interface Props {
    id: string;
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    isDisabled: boolean;
    type?: string;
    placeholder?: string;
    autoFocus?: boolean;
}

export function DemographicsInput({
                                      id,
                                      error,
                                      type = "text",
                                      placeholder,
                                      autoFocus,
                                      value,
                                      onChange,
                                      isDisabled
                                  }: Props): JSX.Element {
    return (
        <input
            id={id}                 //to use the for tag in label
            className={error ? inputErrorStyle : inputDefaultStyle}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            form={"demographicsForm"} //to associate with the form
        />
    );
}