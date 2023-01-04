import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TasksTable from "./TasksTable";

function PageSection() {

    const categories = useSelector((state: RootState) => state.categories.categories);
    const currentCategory = useSelector((state: RootState) => state.categories.currentCategory);

    const category = categories.find(item => item.id === currentCategory) as Category;

    return (
        <div className="w-full h-full overflow-auto flex flex-col text-stone-700">
            {/* Add new task button */}
            <div className="w-full p-4 flex justify-end bg-stone-100 border-b border-stone-200">
                <button className='text-xs uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new task
                </button>
            </div>

            {/* Main section */}
            <div className="w-full h-full py-4 flex flex-col md:flex-row md:divide-x">
                {/* Category tables */}
                {category.tables.map(table => {
                    return <TasksTable table={table} key={table.name}></TasksTable>
                })}

                {/* Create new table button */}
                <div className="h-full flex flex-col p-4 w-full md:w-60">
                    <div className="h-full w-full flex flex-col bg-stone-100 rounded-xl justify-center items-center gap-4 p-4 hover:bg-stone-200 cursor-pointer text-stone-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p className="text-xs uppercase font-semibold">Add new table</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageSection;