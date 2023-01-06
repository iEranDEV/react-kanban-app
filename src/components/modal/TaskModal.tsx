import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteTask, updateTask } from "../../store/tasksSlice";

type TaskModalProps = {
    task: Task,
    toogleTaskModal: Function
}

function TaskModal({task, toogleTaskModal}: TaskModalProps) {
    // Store variables
    const categories = useSelector((state: RootState) => state.categories.categories);
    const dispatch = useDispatch();

    // Clone subtasks
    const clone = () => {
        let arr = Array<{id: string, value: string, done: boolean}>();
        task.subtasks.forEach(subtask => arr.push({...subtask}));
        return arr;
    }

    // State variables
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [tableID, setTableID] = useState(task.tableID);
    const [subtasks, setSubtasks] = useState(clone());

    // Refs
    const subtaskName = useRef(null);

    // Create new subtask
    const addSubtask = () => {
        if(subtaskName.current) {
            let val = (subtaskName.current as HTMLInputElement).value;
            let newSubtasks = [...subtasks];
            newSubtasks.push({
                id: crypto.randomUUID(),
                value: val,
                done: false
            })
            setSubtasks(newSubtasks);
            (subtaskName.current as HTMLInputElement).value = '';
        }
    }

    // Toggle subtask status
    const toggleSubtaskStatus = (id: string) => {
        let newSubtasks = [...subtasks];
        const subtask = newSubtasks.find(item => item.id === id);
        if(subtask) {
            subtask.done = !subtask?.done;
            setSubtasks(newSubtasks);
        }
    }

    // Delete subtask
    const deleteSubtask = (id: string) => {
        let newSubtasks = [...subtasks];
        newSubtasks.splice(newSubtasks.findIndex(item => item.id === id), 1)
        setSubtasks(newSubtasks);
    }

    // Save
    const submit = () => {
        toogleTaskModal(null);
        dispatch(updateTask({
            id: task.id,
            tableID: tableID,
            categoryID: task.categoryID,
            name: name,
            description: description,
            subtasks: subtasks
        } as Task))
    }

    // Delete
    const submitDelete = () => {
        toogleTaskModal(null);
        dispatch(deleteTask(task));
    }


    return (
        <div className="modal">
            <div className="rounded-xl shadow-xl flex flex-col gap-4 bg-stone-100 p-4 w-full h-full md:h-auto md:w-[40rem]">
                <div className="flex items-center justify-between">
                    <p className='uppercase font-semibold'>Task menu</p>
                    <svg onClick={() => toogleTaskModal()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <hr />

                <div className='flex flex-col gap-4'>
                    {/* Task name and table */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <input type="text" className='w-full md:w-1/2 bg-stone-200 p-2 rounded-xl placeholder-stone-400' placeholder='Task name' value={name} onChange={(e) => setName(e.target.value)} />
                        <select value={tableID} onChange={(e) => setTableID(e.target.value)} className='w-full md:w-1/2 bg-stone-200 p-2 rounded-xl text-stone-700'>
                            {categories.find(item => item.id === task.categoryID)?.tables.map(table => {
                                return <option key={table.id} value={table.id} className='w-full'>{table.name}</option>
                            })}
                        </select>
                    </div>

                    {/* Task description */}
                    <div className="w-full">
                        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className='w-full bg-stone-200 p-2 rounded-xl placeholder-stone-400' placeholder="Description"></textarea>
                    </div>

                    {/* Subtasks */}
                    <div className="flex flex-col gap-2">
                        <p className='text-xs uppercase font-semibold  text-stone-400'>Sub tasks</p>

                        <div className="w-full flex flex-col gap-1">
                            {subtasks.map(item => {
                                return (<div key={item.id} className="w-full flex gap-2 items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div onClick={() => toggleSubtaskStatus(item.id)} className={`w-6 h-6 border-2 flex cursor-pointer items-center justify-center rounded-lg ${item.done ? 'border-green-500 text-green-500' : 'border-stone-400'}`}>
                                            {item.done && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>}
                                        </div>
                                        <p>{item.value}</p>
                                    </div>
                                    <svg onClick={() => deleteSubtask(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>  
                                </div>)
                            })}
                        </div>

                        <div className="w-full flex gap-2">
                            <input type="text" ref={subtaskName} className='w-full bg-stone-200 p-2 rounded-xl placeholder-stone-400' placeholder="Enter subtask name" />
                            <button onClick={() => addSubtask()} className='md:w-fit text-xs uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <hr />
                <div className='w-full gap-2 flex items-center justify-between'>
                    <button onClick={() => submitDelete()} className='w-1/2 md:w-auto text-xs uppercase font-semibold bg-red-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-red-500/90 flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </button>

                    <button onClick={() => submit()} className='text-xs w-1/2 md:w-max uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal;