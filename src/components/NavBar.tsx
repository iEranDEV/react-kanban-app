import logo from '../logo.png';
import { useState } from 'react';
import type { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import CategoryButton from './CategoryButton';
import NewCategoryModal from './modal/NewCategoryModal';
import EditCategoryModal from './modal/EditCategoryModal';


function NavBar() {
    // State 
    const [menu, setMenu] = useState(false);
    const [categoryCreate, setCategoryCreate] = useState(false);
    const [categoryEdit, setCategoryEdit] = useState(null);


    const toggleCategoryCreate = () => {
        setCategoryCreate(!categoryCreate);
    }

    const toggleCategoryEdit = (val: Category) => {
        setCategoryEdit(val as any)
    }

    const toggleMenu = () => {
        setMenu(!menu);
    }
    
    // Store
    const categories = useSelector((state: RootState) => state.categories.categories);

	return (
		<div className="bg-stone-100 w-full md:w-96 py-4 px-4 md:px-0 flex relative justify-between md:justify-start gap-8 items-center md:flex-col border-b md:border-b-0 md:border-r border-stone-200 text-stone-700">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img draggable={false} src={logo} alt="Logo" className='h-10' />
                <p className="text-lg font-semibold md:hidden">Name of selected group</p>
            </div>

            {/* Current list selector */}
            <div className={`absolute md:static top-0 w-screen h-screen md:w-full md:h-full flex flex-col gap-8 transition-all bg-stone-100 duration-300 p-4 ${menu ? 'left-0' : '-left-full'}`}>
                <div className="flex justify-between items-center md:hidden">
                    <img src={logo} alt="Logo" className='h-10' />
                    <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                {/* List of categories */}
                <div className='flex flex-col gap-2'>
                    <p className='text-xs uppercase font-semibold  text-stone-400'>YOUR CATEGORIES</p>
                    {categories.map(category => {
                        return <CategoryButton toggleCategoryEdit={toggleCategoryEdit} category={category} key={category.id}></CategoryButton>
                    })}
                </div>

                {/* Category edit modal */}
                {categoryEdit != null && <EditCategoryModal category={categoryEdit} toggleCategoryEdit={toggleCategoryEdit}></EditCategoryModal>}

                {/* Category creating modal */}
                {categoryCreate && <NewCategoryModal toggleCategoryModal={toggleCategoryCreate} categoryModal={categoryCreate}></NewCategoryModal>}


                {/* Add new category button */}
                <div onClick={toggleCategoryCreate} className="w-full py-2 px-2 rounded-xl items-center justify-start flex gap-4 hover:bg-stone-200 cursor-pointer text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <p className='text-xs uppercase font-semibold'>
                        Create new category
                    </p>
                </div>
            </div>

            {/* Mobile menu toggler */}
            <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 md:hidden">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
		</div>
	);
}

export default NavBar;
