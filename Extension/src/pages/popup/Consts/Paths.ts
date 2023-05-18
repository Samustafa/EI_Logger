import {QuestionnaireType} from "@pages/popup/Types";

const landingPage = '/';
const tasksPage = "/tasksPage";
const fetchingStudyData = '/fetchingStudyData';
const demographicsPage = '/demographicsPage';
const postQuestionnaire = '/postQuestionnaire';
const idDisplayPage = '/idDisplayPage';
const defaultQuestionnaire = '/questionnairePage/:questionnaireType';
const loggerPage = '/loggerPage';


function questionnairePage(questionnaireType: QuestionnaireType) {
    return `/questionnairePage/${questionnaireType}`;
}


export default {
    landingPage,
    idDisplayPage,
    tasksPage,
    fetchingStudyData,
    questionnairePage,
    loggerPage,
    demographicsPage,
    defaultQuestionnaire
}
