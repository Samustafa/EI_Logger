import {createMachine} from "xstate";

export const EI_Machine = createMachine({
    id: "EI_Logger",
    initial: "Not_Authenticated",
    states: {
        Not_Authenticated: {
            initial: "LandingPage",
            states: {
                LandingPage: {
                    entry: "navigateToLandingPage",
                    on: {
                        REGISTER: {
                            target: "RegistrationPage",
                        },
                    },
                },
                RegistrationPage: {
                    entry: "navigateToRegistrationPage",
                    on: {
                        BACK: {
                            target: "LandingPage",
                        },
                    },
                },
            },
        },
    },
    schema: {events: {} as { type: "REGISTER" } | { type: "BACK" }},
    predictableActionArguments: true,
    preserveActionOrder: true,
});