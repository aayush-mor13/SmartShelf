import React from 'react'
import {NavLink} from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4 mt-8">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">

            <div className="sm:flex sm:items-center sm:justify-between">

                <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="" className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">SmartShelf</span>
                </div>

                <ul className="flex flex-wrap items-center gap-10 mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                    <li>
                        <NavLink href="#" className="hover:underline me-4 md:me-6">About</NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="hover:underline me-4 md:me-6">Privacy Policy</NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="hover:underline me-4 md:me-6">Licensing</NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="hover:underline">Contact</NavLink>
                    </li>
                </ul>

            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-blue-500 sm:text-center font-bold">© 2025 <NavLink to='/' className="hover:underline">SmartShelf™</NavLink>. All Rights Reserved.</span>
        </div>
    </footer>
  )
}

export default Footer
