import {useState} from "react";
import {Task} from "@pages/popup/model/Task";

export function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div>
            <h1>Tasks</h1>
        </div>
    );
}