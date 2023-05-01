import {Task} from "@pages/popup/model/Task";
import {dataBase} from "@pages/popup/database";
import {useEffect, useState} from "react";

export function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        dataBase.getTasks().then((tasks) => {
            setTasks(tasks);
        }).catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            {tasks.map((task: Task) => <div key={task.taskId}>{task.text}</div>)}
        </div>
    );

}