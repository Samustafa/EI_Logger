import {describe, expect, test, vitest} from "vitest";
import React from "react";
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from "@pages/popup/Components/Not_Authenticated/LandingPage";
import {MemoryRouter} from "react-router-dom";
import {inputDefaultStyle} from "@pages/popup/Consts/Styles";
import axios from "axios";

vitest.mock('axios');
//check the mock one more time, i presume it's not working
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RegistrationPage", () => {
    beforeEach(() => cleanup());
    test("renders correctly", () => {
        render(<LandingPage/>, {wrapper: MemoryRouter});
        expect(screen).toBeTruthy();
    });
    test("Submit button renders correctly", () => {
        render(<LandingPage/>, {wrapper: MemoryRouter});
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeInTheDocument();
    });
    test("Back button renders correctly", () => {
        render(<LandingPage/>, {wrapper: MemoryRouter});
        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
    });

    describe("Label", () => {
        test("Label renders correctly", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const label = screen.getByText('Registration Code:');
            expect(label).toBeInTheDocument();
        });

        test("Label has correct for property", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const label = screen.getByText('Registration Code:');
            expect(label).toHaveAttribute('for', 'registrationCode');
        });

    });
    describe("Input", () => {
        test("Input renders correctly", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const label = screen.getByPlaceholderText('12345678-1234-1234-123456789ABC');
            expect(label).toBeInTheDocument();
        });
        test("has correct initial style", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const input = screen.getByPlaceholderText('12345678-1234-1234-123456789ABC');
            expect(input).toHaveAttribute("class", inputDefaultStyle);
        });
        test("is enabled initially", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const input = screen.getByPlaceholderText('12345678-1234-1234-123456789ABC');
            expect(input).not.toBeDisabled();
        });
        test("has attribute minimum length of 31 characters", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const input = screen.getByPlaceholderText('12345678-1234-1234-123456789ABC');
            expect(input).toHaveAttribute("minlength", "36");
        });
        test.todo("accepts input of minimum length of 31: UserEvent is missing ./index and testing with fireEvent doesn't work");
        test.todo("is disabled during validation");
        test("Value changes", () => {
            mockedAxios.post.mockRejectedValueOnce({response: {data: {message: "Test Error"}}});
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const input = screen.getByPlaceholderText('12345678-1234-1234-123456789ABC');
            fireEvent.change(input, {target: {value: '12345678-1234-1234-123456789ABC'}});
            expect(input).toHaveValue('12345678-1234-1234-123456789ABC');
        });
    });
    describe("Error Text", () => {
        test("Error text doesn't render initially", () => {
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const errorText = screen.queryByTestId('error_text');
            expect(errorText).not.toBeInTheDocument();
        });
        test("rendering error text when post request is faulty", () => {
            //still not finished, not finding the error text
            mockedAxios.post.mockRejectedValueOnce({response: {data: {message: "Test Error"}}});
            render(<LandingPage/>, {wrapper: MemoryRouter});
            const input = screen.getByPlaceholderText('12345678-1234-1234-123456789ABC');
            const submitButton = screen.getByText('Submit');

            fireEvent.change(input, {target: {value: '12345678-1234-1234-123456789ABC'}});
            waitFor(() => fireEvent.click(submitButton));
            screen.debug();
        });
    });

});