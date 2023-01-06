import { useState } from "react";

type TaskProps = {
    task: Task,
    toogleTaskModal: Function
}

function Task({ task, toogleTaskModal }: TaskProps) {
    const [subtasksDone, setSubtasksDone] = useState(task.subtasks.filter(item => item.done === true).length);

    return (
        <div onDrag={() => console.log('test')} onClick={() => toogleTaskModal(task)} className="w-full bg-stone-100 p-2 rounded-xl flex flex-col gap-1 text-stone-700 hover:bg-stone-200/90 cursor-pointer">
            <div className="truncate">
                {task.name}
            </div>
            <div className="flex justify-end items-center text-stone-400 text-sm gap-2">
                {subtasksDone}/{task.subtasks.length}
            </div>
        </div>
    )
}

export default Task;