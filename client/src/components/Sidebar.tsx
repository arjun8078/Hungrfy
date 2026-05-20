import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps){

 const navigate = useNavigate()
  const {user, logout} = useAuth()
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Browse', path: '/browse' },
  { label: 'AI Planner', path: '/ai' },
]

 
    const handleLogout = () => {
    logout()
    onClose()
  }
  const handleNav = (path: string) => {
    navigate(path)
    onClose()
  }


    return(
        <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl 
        transform transition-transform duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Top — user info */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">PlateUp</h2>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-500 font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Middle — nav links */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => handleNav(item.path)}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-700 
                hover:bg-orange-50 hover:text-orange-500 transition font-medium text-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom — logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-lg text-red-500 
              hover:bg-red-50 transition font-medium text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </>
    )
}