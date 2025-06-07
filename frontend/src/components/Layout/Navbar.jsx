import React from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom";

function Navbar() {

    const role = localStorage.getItem('role');

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        navigate('/');
        window.location.reload();
    };

  return (
    // <nav className="border-gray-200 bg-blue-500  w-full fixed top-0 left-0 z-50">
    <nav className="border-gray-200 bg-blue-500">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link 
            to='/'
            className="flex items-center space-x-3 rtl:space-x-reverse"
            >
                <img src="" className="h-8" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SmartShelf</span>
            </Link>

            <div className="hidden w-full md:block md:w-auto">
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                    {role !== 'admin' && <li>
                    <NavLink to='/' className={({isActive})=>`block transition-colors md:hover:text-blue-950 font-bold ${isActive? "text-blue-950":"text-white"}`}>Home</NavLink>
                    </li>}
                    {role === 'admin' && <li>
                    <NavLink to='/dashboard' className={({isActive})=>`block transition-colors md:hover:text-blue-950 font-bold ${isActive? "text-blue-950":"text-white"}`}>Dashboard</NavLink>
                    </li>}
                    {role === 'user' && <li>
                    <NavLink to='suggestions' className={({isActive})=>`block transition-colors hover:text-blue-950 font-bold ${isActive ? "text-blue-950" : "text-white"}`}>Your Suggestions</NavLink>
                    </li>}
                    {role === 'admin' && <li>
                    <NavLink to='/add' className={({isActive})=>`block transition-colors hover:text-blue-950 font-bold ${isActive ? "text-blue-950" : "text-white"}`}>Add Books</NavLink>
                    </li>}
                    {role === 'admin' && <li>
                    <NavLink to='/edit' className={({isActive})=>`block transition-colors hover:text-blue-950 font-bold ${isActive ? "text-blue-950" : "text-white"}`}>Edit Books</NavLink>
                    </li>}
                    {role === 'admin' && <li>
                     <NavLink to='/delete' className={({isActive})=>`block transition-colors hover:text-blue-950 font-bold ${isActive ? "text-blue-950" : "text-white"}`}>Delete Books</NavLink>
                    </li>}
                    {!role && <li>
                    <NavLink to='/register' className="block transition-colors text-white hover:text-blue-950 font-bold">Register</NavLink>
                    </li>}
                    {!role && <li>
                    <NavLink to='/login' className="block transition-colors text-white hover:text-blue-950 font-bold">Login</NavLink>
                    </li>}
                    {role && <li>
                    <button onClick={handleLogout} className="block transition-colors text-white hover:text-blue-950 font-bold">Logout</button>
                    </li>}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;