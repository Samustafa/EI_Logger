import {useParams} from "react-router-dom";

export function IdDisplayPage() {
    const {id} = useParams<string>();

    return (
        <>
            <p>Registration Successful!</p>
            <br/>
            <p>{id}</p>
            <br/>
            <p>Please save your ID somewhere safe and don't share it with any person, even the people responsible for
                the
                study!</p>
            <p>You will need your ID, if you decide to log-in from another device!</p>
        </>
    );
}