import {QuestionnaireType} from "@pages/popup/Types";

const landingPage = '/';
const registrationPage = '/registrationPage';
const tasksPage = "/tasksPage";
const fetchingStudyData = '/fetchingStudyData';
const demographicsPage = '/demographicsPage';
const defaultQuestionnaire = '/questionnairePage/:questionnaireType';
const loggerPage = '/loggerPage';

function idDisplayPage(id = ':id') {
    return `/idDisplayPage/${id}`;
}


function questionnairePage(questionnaireType: QuestionnaireType) {
    return `/questionnairePage/${questionnaireType}`;
}


export default {
    registrationPage,
    landingPage,
    idDisplayPage,
    tasksPage,
    fetchingStudyData,
    questionnairePage,
    loggerPage,
    demographicsPage,
    defaultQuestionnaire
}
