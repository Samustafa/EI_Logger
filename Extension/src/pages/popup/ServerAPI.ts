import axios from "axios";
import {IUser} from "@pages/popup/Interfaces";
import {Study} from "@pages/popup/model/Study";


export async function registerUser(code: string) {
    return await axios.post<IUser>(`http://localhost:8080/logger/registerUser/${code}`);
}

export async function getStudy() {
    return await axios.get<Study>(`http://localhost:8080/logger/getTestStudy`);
}