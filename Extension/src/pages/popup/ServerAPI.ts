import axios from "axios";

interface IRegistrationCode {
    code: string;
}

export async function registerUser(code: string) {
    return await axios.post<IRegistrationCode>(`http://localhost:8080/logger/registerUser/${code}`);

}