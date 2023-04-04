const landingPage = '/';
const registrationPage = '/registrationPage';

function idDisplayPage(id: string = ':id') {
    return `/idDisplayPage/${id}`;
}

export default {registrationPage, landingPage, idDisplayPage}