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

    describe('Log In Button', () => {
        test('It renders', () => {
            render(<LandingPage/>);
            const loginButton = screen.getByRole('button', {name: /Log In/i});
            expect(loginButton).toBeInTheDocument();
        });
    });

    describe('Register Button', () => {
        test('It renders a Register Button', () => {
            render(<LandingPage/>);
            const registerButton = screen.getByRole('button', {name: /Register/i});
            expect(registerButton).toBeInTheDocument();
        });
    });

})