import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsSidebarVisible(window.innerWidth >= 770)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">

      {/* Navbar */}
      <div className="h-16 fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Layout */}
      <div className="flex pt-16 h-full">

        {/* Sidebar */}
        <div className="w-64 h-[calc(100vh-64px)] fixed left-0 top-16"
          style={{ display: isSidebarVisible ? 'flex' : 'none' }}
        >
          <Sidebar />
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 h-[calc(100vh-64px)] transition-all duration-300`}
          style={{ marginLeft: isSidebarVisible ? 256 : 0 }} // 64 * 4px = 256px
        >
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default App
