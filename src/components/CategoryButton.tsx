import { useDispatch, useSelector } from "react-redux";
import { setCurrentCategory } from "../store/categoriesSlice";
import { RootState } from "../store/store";

type CategoryButtonProps = {
    category: Category,
}

function CategoryButton({ category }: CategoryButtonProps) {

    const currentCategory = useSelector((state: RootState) => state.categories.currentCategory);
    const dispatch = useDispatch();

    const setCurrent = () => {
        dispatch(setCurrentCategory(category))
    }

    return (
        <div onClick={setCurrent} className={`w-full py-2 px-2 rounded-xl items-center justify-start flex gap-4 hover:bg-stone-200/50 cursor-pointer ${currentCategory === category.id && 'bg-stone-200 font-semibold'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <p className="">
                {category.name}
            </p>
        </div>
    )
}

export default CategoryButton;