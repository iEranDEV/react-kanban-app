import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { updateTaskTable } from '../store/tasksSlice'
import Task from './Task'

type TasksTableProps = {
    table: {
        id: string,
        name: string,
        color: string
    },
    tasks: Array<Task>,
    toogleTaskModal: Function
}

function TasksTable({ table, tasks, toogleTaskModal }: TasksTableProps) {

    const tableColor = {
        backgroundColor: table.color
    }

    const draggedTask = useSelector((state: RootState) => state.tasks.draggedTask);
    const dispatch = useDispatch();

    // Handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if(draggedTask?.tableID !== table.id) {
            dispatch(updateTaskTable({
                taskID: draggedTask?.id as string,
                tableID: table.id,
            }))
        }
    }

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e)} className="h-full px-4 flex flex-col gap-2 w-full md:w-[300px] task-table overflow-y-auto">
            {/* Table header */}
            <div className="w-full flex items-center justify-between">
                {/* Table name and color */}
                <div className="flex gap-2 items-center">
                    <div className="rounded-full h-6 w-6 border-2 border-stone-100" style={tableColor}></div>
                    <p className=" text-sm font-semibold text-stone-700">{table.name}</p>
                </div>
            </div>

            {/* Tasks */}
            <div className="h-full w-full flex flex-col gap-2">
                {tasks.map(task => {
                    return <Task toogleTaskModal={toogleTaskModal} task={task} key={task.id}></Task>
                })}
            </div>
        </div>
    )
}

export default TasksTable;