import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from "../../store/categoriesSlice";

function NewCategoryModal({ toggleCategoryModal }: any) {
    const [tables, setTables] = useState(Array<{id: string, name: string, color: string}>());
    const [name, setName] = useState('');
    const [currentColor, setCurrentColor] = useState('#3b82f6');

    const tableName = useRef(null);
    const tableColor = useRef(null);

    const dispatch = useDispatch();

    const handleToggle = (event: any) => {
        event.stopPropagation();
        toggleCategoryModal();
    }

    const handleTableSubmit = (event: any) => {
        event.preventDefault();
        if(tableName.current && tableColor.current) {
            setTables([...tables, {
                id: crypto.randomUUID(),
                name: (tableName.current as any).value as string,
                color: currentColor
            }]);
            (tableName.current as any).value = '';
        }
    }

    const handleTableDelete = (id: string) => {
        const temp = [...tables];
        temp.splice(temp.findIndex(item => item.id === id), 1);
        setTables(temp);
    }

    const createCategory = () => {
        dispatch(addCategory({
            id: crypto.randomUUID(),
            name: name,
            tables: tables
        } as Category));
        toggleCategoryModal();
    }


    return (
        <div className="modal">
            <div className="rounded-xl shadow-xl flex flex-col gap-4 bg-stone-100 p-4 w-full h-full md:h-auto md:w-[40rem]">
                <div className="flex items-center justify-between">
                    <p className='uppercase font-semibold'>Create new category</p>
                    <svg onClick={(event) => handleToggle(event)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <hr />
                
                {/* Category name input */}
                <div className="flex flex-col gap-1 md:w-[24rem]">
                    <label htmlFor="category_name" className="text-sm uppercase font-semibold text-stone-400">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" name="category_name" id="category_name" className="bg-stone-200 p-2 rounded-xl placeholder-stone-400" placeholder="Example category name" />
                </div>

                {/* Tables input */}
                <div className='flex flex-col gap-1'>
                    <p className='text-sm uppercase font-semibold text-stone-400'>Tables</p>

                    <div className='my-6 md:w-1/2 flex flex-col gap-2'>
                        {tables.map(table => {
                            return (<div key={table.id} className='flex w-full justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <div className='h-5 w-5 rounded-full' style={{backgroundColor: table.color}}></div>
                                    <p>{table.name}</p>
                                </div>
                                <svg onClick={() => handleTableDelete(table.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>)
                        })}
                    </div>

                    <div className='flex w-full flex-col md:flex-row gap-2'>
                        <input type="text" className='w-full bg-stone-200 p-2 rounded-xl placeholder-stone-400' placeholder='Table name' ref={tableName} />
                        <div className='flex'>
                            <input type="color" className='invisible w-0 h-full bg-stone-200 rounded-xl' ref={tableColor} onChange={e => setCurrentColor(e.target.value)} />
                            <div className='w-full flex gap-2'>
                                <button onClick={() => (tableColor.current as any).click()} className='px-4 w-1/2 md:w-max text-stone-100 rounded-xl flex justify-center bg-blue-500 items-center gap-2 uppercase font-semibold text-xs' style={{backgroundColor: currentColor}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                                    </svg>
                                    <p>Pick color</p>
                                </button>
                                <button onClick={(event) => handleTableSubmit(event)} className='text-xs w-1/2 md:w-max uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div className='w-full gap-2 flex items-center justify-end'>
                    <button onClick={() => createCategory()} className='text-xs uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create category
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewCategoryModal;