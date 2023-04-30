const landingPage = '/';
const registrationPage = '/registrationPage';
const tasksPage = "/tasksPage";
const fetchingStudyData = '/fetchingStudyData';
const demographicsPage = '/demographicsPage';

function idDisplayPage(id = ':id') {
    return `/idDisplayPage/${id}`;
}

export default {registrationPage, landingPage, idDisplayPage, tasksPage, fetchingStudyData, demographicsPage}