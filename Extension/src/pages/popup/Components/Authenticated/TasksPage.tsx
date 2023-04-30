import {useEffect, useState} from "react";
import {Task} from "@pages/popup/model/Task";
import {dataBase} from "@pages/popup/database";

export function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        dataBase.getTasks().then((tasks) => {
            setTasks(tasks);
        });
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            {tasks.map((task: Task) => <div key={task.taskId}>{task.text}</div>)}
        </div>
    );

}