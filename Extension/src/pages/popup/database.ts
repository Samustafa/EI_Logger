// db.ts
import Dexie, {Table} from 'dexie';
import {IQuestion, IStudy, ITask, IUser} from "@pages/popup/Interfaces";

class DataBase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instantiated by Dexie in stores() method)
    user!: Table<IUser, string>; // string = type of the primaryKey
    study!: Table<IStudy, string>;
    task!: Table<ITask, string>;
    question!: Table<IQuestion, string>;

    //...other tables goes here...

    constructor() {
        super('DataBase');
        this.version(1).stores({
            user: '++id', // Primary key and indexed props
            study: 'studyId, studyName, tasks',
            task: 'taskId, text, hasPreQuestionnaire, hasPostQuestionnaire',
            question: 'questionId, questionText, type, choices, range, maxCharacters'
            //...other tables goes here...
        });
    }


}

export const dataBase = new DataBase();