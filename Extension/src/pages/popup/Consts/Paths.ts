const landingPage = '/';
const tasksPage = "/tasksPage";
const fetchingStudyData = '/fetchingStudyData';
const demographicsPage = '/demographicsPage';
const postQuestionnaire = '/postQuestionnaire';
const idDisplayPage = '/idDisplayPage';

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
