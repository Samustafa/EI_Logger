import {IApiException} from "@pages/popup/Interfaces";

/**
 * Extracts the server exception from response or extracts error message if server didn't respond
 * @param error
 * @param setError
 */
export function extractAndSetError(error: any, setError: (error: string) => void) {
    console.log(error)
    const serverException: IApiException = error.response?.data;
    setError(serverException ? serverException.message : error.message);
}