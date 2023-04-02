import {buttonStyle} from "@pages/popup/Styles";

export default function LandingPage(): JSX.Element {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
            <h2>welcome to the EI_Logger</h2>
            <button className={buttonStyle}>Log In</button>
            <button className={buttonStyle}>Register</button>
        </div>
    );
}