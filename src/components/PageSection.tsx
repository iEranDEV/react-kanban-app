import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NewTableModal from "./modal/NewTableModal";
import NewTaskModal from "./modal/NewTaskModal";
import TaskModal from "./modal/TaskModal";
import TasksTable from "./TasksTable";

function PageSection() {
    // State variables
    const [createTableModal, setCreateTableModal] = useState(false);
    const [createTaskModal, setCreateTaskModal] = useState(false);
    const [taskModal, setTaskModal] = useState(null);

    // Store variables
    const categories = useSelector((state: RootState) => state.categories.categories);
    const currentCategory = useSelector((state: RootState) => state.categories.currentCategory);
    const tasks = useSelector((state: RootState) => state.tasks.tasks.filter(item => item.categoryID === currentCategory));

    // Current category
    const category = categories.find(item => item.id === currentCategory) as Category;

    // Toggle table creation modal
    const toggleCreateTableModal = () => {
        setCreateTableModal(!createTableModal);
    }

    // Toggle task creation modal
    const toggleCreateTaskModal = () => {
        setCreateTaskModal(!createTaskModal);
    }

    // Toggle task edit modal
    const toogleTaskModal = (val: Task | null) => {
        setTaskModal(val as any);
    }
    
    if(currentCategory !== 'none') {
        return (
            <div className="w-full h-full overflow-x-auto flex flex-col text-stone-700">
                {/* Add new task button */}
                <div className="w-full p-4 flex justify-start">
                    <button onClick={toggleCreateTaskModal} className='text-xs uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new task
                    </button>
                </div>

                {/* Create task modal */}
                {createTaskModal && <NewTaskModal toggleCreateTaskModal={toggleCreateTaskModal}></NewTaskModal>}

                {/* Edit task modal */}
                {taskModal != null && <TaskModal toogleTaskModal={toogleTaskModal} task={taskModal}></TaskModal>}
    
                {/* Main section */}
                <div className="w-full h-full py-4 flex flex-col md:flex-row md:divide-x">
                    {/* Category tables */}
                    {category.tables.map(table => {
                        return <TasksTable table={table} key={table.id} toogleTaskModal={toogleTaskModal} tasks={tasks.filter(item => item.tableID === table.id && item.categoryID === currentCategory)}></TasksTable>
                    })}
    
                    {/* Create new table button */}
                    <div onClick={() => toggleCreateTableModal()} className="h-full flex flex-col md:block p-4 w-full task-table md:w-[300px]">
                        <div className="h-full w-full flex flex-col bg-stone-100 rounded-xl justify-center items-center gap-4 p-4 hover:bg-stone-200 cursor-pointer text-stone-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className="text-xs uppercase font-semibold">Add new table</p>
                        </div>
                    </div>
                </div>
    
                {/* Create table modal */}
                {createTableModal && <NewTableModal category={category} toggleCreateTableModal={toggleCreateTableModal}></NewTableModal>}
            </div>
        )
    } else {
        return (
            <div className="w-full h-full flex justify-center items-center flex-col text-stone-400 gap-4 mt-72 md:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <p className="text-xs uppercase font-semibold">Create your first category</p>
            </div>
        )
    }
}

export default PageSection;