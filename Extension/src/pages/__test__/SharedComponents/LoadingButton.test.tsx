import {describe, expect, test, vitest} from "vitest";
import React from "react";
import {LoadingButton} from "@pages/popup/SharedComponents/LoadingButton";
import {cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


describe("LoadingButton", () => {
    beforeEach(() => cleanup());
    test("renders correctly", () => {
        render(<LoadingButton text="Test Button" loadingText="Loading..." isLoading={false}/>);
        expect(screen).toBeTruthy();
    });
    test("renders loadingText when isLoading is true", () => {
        render(<LoadingButton text="Test Button" loadingText="Loading..." isLoading={true}/>);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByText('Test Button')).not.toBeInTheDocument();
    });
    test("renders text when isLoading is false", () => {
        render(<LoadingButton text="Test Button" loadingText="Loading..." isLoading={false}/>);
        expect(screen.getByText('Test Button')).toBeInTheDocument();
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    test("is disabled when isLoading is true", () => {
        render(<LoadingButton text="Test Button" loadingText="Loading..." isLoading={true}/>);
        const button = screen.getByText('Loading...');
        expect(button).toBeDisabled();
    });
    test("is enabled when isLoading is false", () => {
        render(<LoadingButton text="Test Button" loadingText="Loading..." isLoading={false}/>);
        const button = screen.getByText('Test Button');
        expect(button).not.toBeDisabled();
    });
    test("clicks", async () => {
        render(<LoadingButton text="Test Button" loadingText="Loading..." isLoading={false}/>);
        const button = screen.getByText('Test Button');
        const user = userEvent.setup();
        const clickSpy = vitest.spyOn(user, 'click');
        await user.click(button);
        expect(clickSpy).toHaveBeenCalledOnce();
    });
});