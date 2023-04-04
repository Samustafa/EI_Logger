import axios from "axios";

export async function registerUser(code: string) {
    return await axios.post(`http://localhost:8080/logger/registerUser/${code}`);

}