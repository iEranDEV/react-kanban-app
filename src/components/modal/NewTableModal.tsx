import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTableToCategory } from "../../store/categoriesSlice";

type NewTableProps = {
    category: Category,
    toggleCreateTableModal: Function,
}


function NewTableModal({category, toggleCreateTableModal}: NewTableProps) {
    // State variables
    const [color, setColor] = useState('#3b82f6');
    const [name, setName] = useState('');

    // Refs
    const colorElement = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    // Create new table
    const submit = () => {
        toggleCreateTableModal();
        dispatch(addTableToCategory({category: category, table: {
            id: crypto.randomUUID(),
            name: name,
            color: color,
        }}))
    }

    return (
        <div className="modal">
            <div className="rounded-xl shadow-xl flex flex-col gap-4 bg-stone-100 p-4 w-full h-full md:h-auto md:w-[40rem]">
                <div className="flex items-center justify-between">
                    <p className='uppercase font-semibold'>Create new table</p>
                    <svg onClick={() => toggleCreateTableModal()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <hr />

                {/* Tables input */}
                <div className='flex flex-col gap-1'>

                    <div className='flex w-full flex-col md:flex-row gap-2'>
                        <input type="text" className='w-full bg-stone-200 p-2 rounded-xl placeholder-stone-400' placeholder='Table name' value={name} onChange={(e) => setName(e.target.value)} />
                        <div className='flex'>
                            <input type="color" className='invisible w-0 h-full bg-stone-200 rounded-xl' ref={colorElement} value={color} onChange={(e) => setColor(e.target.value)} />
                            <button onClick={() => colorElement.current?.click()} className='px-4 py-2 w-full md:w-max text-stone-100 rounded-xl flex justify-center bg-blue-500 items-center gap-2 uppercase font-semibold text-xs' style={{backgroundColor: colorElement.current?.value}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                                </svg>
                                <p>Pick color</p>
                            </button>
                        </div>
                    </div>
                </div>

                <hr />
                <div className='w-full gap-2 flex items-center justify-end'>
                    <button onClick={() => submit()} className='text-xs w-1/2 md:w-max uppercase font-semibold bg-blue-500 py-2 px-4 text-stone-100 rounded-xl hover:bg-blue-500/90 flex gap-2 items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )

}

export default NewTableModal;