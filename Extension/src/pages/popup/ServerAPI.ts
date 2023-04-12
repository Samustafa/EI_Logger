import axios from "axios";
import {IUser} from "@pages/popup/Interfaces";


export async function registerUser(code: string) {
    return await axios.post<IUser>(`http://localhost:8080/logger/registerUser/${code}`);

}