import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { links } from '../tools/Links'

function Sidebar() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth >= 770)
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="w-64 h-[calc(100vh-64px)] 
                        bg-gradient-to-b from-gray-100 to-gray-200 
                        border-r border-gray-300 
                        shadow-sm p-6 flex-col"
            style={{ display: isVisible ? 'flex' : 'none' }}
        >

            <h2 className="text-xl font-bold text-green-700 mb-5">
                Navigation
            </h2>

            <ul className="space-y-3 text-gray-700 font-medium">
                {links.map((link) => (
                    <li key={link.name}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg
                                transition-all duration-200
                                ${isActive
                                    ? "bg-green-600 text-white font-semibold"
                                    : "hover:bg-gray-400 hover:text-white"
                                }`
                            }
                        >
                            {link.icon} {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Sidebar
