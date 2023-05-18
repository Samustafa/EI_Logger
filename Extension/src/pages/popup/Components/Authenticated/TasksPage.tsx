import {dataBase} from "@pages/popup/database";
import {useEffect, useState} from "react";
import {Tasks} from "@pages/popup/Components/Authenticated/Tasks";
import {ITask} from "@pages/popup/Interfaces";

export function TasksPage() {

    const [iTasks, setITasks] = useState<ITask[]>([]);
    useEffect(function fetchTasks() {
        dataBase.getITasks().then((iTasks) => {
            setITasks(iTasks);
        }).catch((error) => console.log(error));
    }, []);


    return (
        <div>
            <h1>Tasks</h1>
            <Tasks iTasks={iTasks}/>
        </div>
    );

}