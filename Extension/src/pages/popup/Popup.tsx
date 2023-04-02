import {Route, Routes} from "react-router-dom";
import React from "react";
import LandingPage from "@pages/popup/Not_Authenticated/LandingPage";


export default function Popup(): JSX.Element {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
            </Routes>
        </div>
    );
}