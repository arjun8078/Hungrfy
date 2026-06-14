type Headerprops = {
    onMenuClick: () => void
}
export function Header({ onMenuClick } : Headerprops) {

    return (
        <>
           <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
      >
        <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
        <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
        <span className="block w-5 h-0.5 bg-gray-600"></span>
      </button>
      <h1 className="text-xl font-bold text-gray-900">Hungryfy</h1>
      <div className="w-9" />
    </header>
        </>
    )
}