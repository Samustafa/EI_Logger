import React, {createContext} from 'react';
import {useInterpret} from '@xstate/react';
import {EI_Machine} from "@pages/popup/Machine/EI_Machine";
import {useNavigate} from "react-router-dom";
import Paths from "@pages/popup/Consts/Paths";
import {InterpreterFrom} from "xstate";

export const GlobalContextProvider = createContext({} as InterpreterFrom<typeof EI_Machine>);

export const GlobalStateProvider = (props: any) => {
    const navigate = useNavigate();
    const authActor = useInterpret(EI_Machine, {
        actions: {
            navigateToRegistrationPage: () => navigate(Paths.registrationPage),
            navigateToLandingPage: () => navigate(Paths.landingPage)
        }
    });

    return (
        <GlobalContextProvider.Provider value={authActor}>
            {props.children}
        </GlobalContextProvider.Provider>
    );
};