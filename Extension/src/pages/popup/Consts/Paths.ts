const landingPage = '/';
const tasksPage = "/tasksPage";
const fetchingStudyData = '/fetchingStudyData';
const demographicsPage = '/demographicsPage';
const postQuestionnaire = '/postQuestionnaire';

function idDisplayPage(id = ':id') {
    return `/idDisplayPage/${id}`;
}

function preQuestionnairePage(taskId = ':taskId') {
    return `/preQuestionnairePage/${taskId}`;
}

function loggerPage(taskId = ':taskId') {
    return `/loggerPage/${taskId}`;
}


export default {
    landingPage,
    idDisplayPage,
    tasksPage,
    fetchingStudyData,
    preQuestionnairePage,
    loggerPage,
    demographicsPage,
    postQuestionnaire
}
