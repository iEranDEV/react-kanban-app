import logo from '../logo.png';
import { useState } from 'react';

function NavBar() {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    }

	return (
		<div className="bg-stone-200 w-full md:w-96 p-4 flex relative justify-between md:justify-start gap-8 items-center md:flex-col border-b-2 border-stone-300 text-stone-700">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className='h-10' />
                <p className="text-lg font-semibold md:hidden">Name of selected group</p>
            </div>

            {/* Current list selector */}
            <div className={`absolute md:static top-0 w-screen h-screen md:w-full md:h-full transition-all duration-300 p-4 bg-stone-500 ${menu ? 'left-0' : '-left-full'}`}>
                <div className="flex justify-between items-center md:hidden">
                    <img src={logo} alt="Logo" className='h-10' />
                    <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
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
