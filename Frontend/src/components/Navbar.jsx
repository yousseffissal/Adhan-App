import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'Prayer Times', path: '/prayer-times' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Quran', path: '/quran' },
]

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white shadow-md border-b border-green-100 w-full h-16 fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <span className="text-2xl font-bold text-green-600">
                        <Link
                            to={'/'}
                            className="hover:text-green-600 transition"
                        >
                            Muslim Planner
                        </Link>
                    </span>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="hover:text-green-600 transition"
                            >
                                {link.name}
                            </Link>
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
                        ☰
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-green-100 shadow-md">
                    <div className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="hover:text-green-600 transition"
                                onClick={() => setIsOpen(false)} // يغلق القائمة عند الضغط
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
                            <Link
                                to={'/login'}
                            >
                                Login
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
