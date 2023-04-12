// db.ts
import Dexie, {Table} from 'dexie';
import {IUser} from "@pages/popup/Interfaces";

class DataBase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instantiated by Dexie in stores() method)
    user!: Table<IUser, string>; // string = type of the primaryKey
    //...other tables goes here...

    constructor() {
        super('DataBase');
        this.version(1).stores({
            user: '++id' // Primary key and indexed props
            //...other tables goes here...
        });
    }
}

export const dataBase = new DataBase();