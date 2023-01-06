import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDraggedTask } from "../store/tasksSlice";

type TaskProps = {
    task: Task,
    toogleTaskModal: Function
}

function Task({ task, toogleTaskModal }: TaskProps) {
    const dispatch = useDispatch();

    // Drag events
    const handleDragStart = () => {
        dispatch(setDraggedTask({...task} as Task));
    }
    const handleDragEnd = () => {
        dispatch(setDraggedTask(null));
    }

    return (
        <div onDragEnd={handleDragEnd} onDragStart={handleDragStart} draggable={true} onClick={() => toogleTaskModal(task)} className="w-full bg-stone-100 p-2 rounded-xl flex flex-col gap-1 text-stone-700 hover:bg-stone-200/90 cursor-pointer">
            <div className="truncate">
                {task.name}
            </div>
            <div className="flex justify-end items-center text-stone-400 text-sm gap-2">
                {task.subtasks.filter(item => item.done === true).length}/{task.subtasks.length}
            </div>
        </div>
    )
}

export default Task;