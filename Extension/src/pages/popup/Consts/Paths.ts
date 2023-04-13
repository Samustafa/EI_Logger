const landingPage = '/';
const registrationPage = '/registrationPage';
const tasksPage = "/tasksPage";
const demographicsPage = "/demographicsPage";

function idDisplayPage(id: string = ':id') {
    return `/idDisplayPage/${id}`;
}

export default {registrationPage, landingPage, idDisplayPage, tasksPage, demographicsPage}