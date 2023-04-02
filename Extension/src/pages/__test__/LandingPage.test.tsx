import {describe, expect, test} from "vitest";
import {cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from "@pages/popup/Not_Authenticated/LandingPage";

describe('LandingPage', () => {
    beforeEach(() => {
        cleanup();
    })

    test('It renders', () => {
        render(<LandingPage/>);
        screen.debug();
    });

    describe('Register Button', () => {

        test('It renders a header', () => {
            render(<LandingPage/>);
            const header = screen.getByText(/Welcome to the EI_Logger/i);
            expect(header).toBeInTheDocument();
        });

        test('It renders a Register Button', () => {
            render(<LandingPage/>);
            const registerButton = screen.getByRole('button', {name: /Register/i});
            expect(registerButton).toBeInTheDocument();
        });
    });

})