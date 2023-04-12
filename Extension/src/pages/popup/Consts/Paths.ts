const landingPage = '/';
const registrationPage = '/registrationPage';
const tasksPage = "/tasksPage";

function idDisplayPage(id: string = ':id') {
    return `/idDisplayPage/${id}`;
}

export default {registrationPage, landingPage, idDisplayPage, tasksPage}