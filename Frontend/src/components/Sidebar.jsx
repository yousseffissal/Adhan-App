import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const links = [
    { name: 'Prayer Times', icon: '🕌', path: '/prayer-times' },
    { name: 'Quran', icon: '📖', path: '/quran' },
    { name: 'My Schedule', icon: '📅', path: '/schedule' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
]

function Sidebar() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth >= 768)
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (!isVisible) return null

    return (
        <div className="md:flex w-64 h-[calc(100vh-64px)] 
                        bg-gradient-to-b from-gray-100 to-gray-200 
                        border-r border-gray-300 
                        shadow-sm p-6 flex-col">

            <h2 className="text-xl font-bold text-green-700 mb-10">
                Navigation
            </h2>

            <ul className="space-y-3 text-gray-700 font-medium">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg
                                       hover:bg-gray-400 hover:text-white
                                       transition-all duration-200"
                        >
                            {link.icon} {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Sidebar
