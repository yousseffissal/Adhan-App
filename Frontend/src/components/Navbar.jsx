import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { links } from '../tools/Links'
import { scrollToTop } from '../tools/ScrollTop'
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className=" bg-white shadow-md border-b border-green-100 w-full h-16 fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    <Link
                        to={'/'}
                        onClick={scrollToTop}
                    >
                        <div className='flex justify-center items-center gap-2'>
                            <img src="/Icon.png" alt="Muslim Planner Logo" className="h-7 w-7" />
                            {/* Logo */}
                            <span className="text-2xl font-bold text-green-600">
                                Muslim Planner
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden navbar:flex space-x-8 text-gray-700 font-medium">
                        {links.slice(0, 4).map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={scrollToTop}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-600 font-semibold border-b-2 border-green-600"
                                        : "hover:text-green-600 transition"
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Button */}
                    <div className="hidden md:block">
                        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
                            <Link
                                to={'/login'}
                            >
                                Login
                            </Link>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-green-600 text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen && <AiOutlineClose />}
                        {!isOpen && <BiMenu />}

                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed top-16 right-0 h-screen w-72 md:hidden bg-white border-green-100 shadow-xl z-40">
                    <div className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
                        {links.map((link, index) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => {
                                    setIsOpen(false);
                                    scrollToTop();
                                }}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-600 text-white font-semibold py-2 px-6 rounded-[20px]"
                                        : "hover:text-green-600 transition px-6"
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
                            <Link to={'/login'}>Login</Link>
                        </button>
                    </div>
                </div>
            )}

        </nav>
    )
}

export default Navbar
