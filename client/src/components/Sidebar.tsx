type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps){

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
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-8">PlateUp</h2>
          <nav className="space-y-2">
            {['Home', 'Browse', 'AI Planner', 'My Account'].map(item => (
              <div
                key={item}
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition font-medium"
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
      </div>
        </>
    )
}