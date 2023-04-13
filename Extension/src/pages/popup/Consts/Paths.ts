const landingPage = '/';
const tasksPage = "/tasksPage";

function idDisplayPage(id: string = ':id') {
    return `/idDisplayPage/${id}`;
}

export default {landingPage, idDisplayPage, tasksPage}