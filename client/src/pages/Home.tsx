import {  useEffect, useMemo, useRef, useState } from "react"
// import { useAuth } from "../context/AuthContext"
import { RestuarentCard } from "../components/RestuarentCard"
import type { Restaurant } from "../types/restuarent"


// export type Restaurant = {
//   id: number
//   name: string
//   cuisine: string
//   area: string
//   rating: number
// }




export function Home(){

 const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)
  const [cuisine, setCuisine] = useState('all')      // ← add this
const [vegOnly, setVegOnly] = useState(false) 

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading) searchRef.current?.focus()
  }, [loading])

  useEffect(() => {
    const timer = setTimeout(() => {
    setRestaurants([
      { id: 1, name: 'Paragon Restaurant', cuisine: 'Kerala', area: 'Kozhikode', rating: 4.5,isVeg: false },
      { id: 2, name: 'Dhe Puttu', cuisine: 'Kerala', area: 'Kochi', rating: 4.2,isVeg: true },
      { id: 3, name: 'Thalassery Biriyani House', cuisine: 'Malabar', area: 'Kannur', rating: 4.7,isVeg: false },
    ])
    setLoading(false)
  }, 800)

  return () => clearTimeout(timer)
  }, [])

  // const filtered = restaurants.filter(r =>
  //   r.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )]

  const cuisines = useMemo(() => {
  const unique = [...new Set(restaurants.map(r => r.cuisine))]
  return ['all', ...unique]
}, [restaurants])
  

 const filtered = useMemo(() => {
  return restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCuisine = cuisine === 'all' || r.cuisine === cuisine
    const matchesVeg = !vegOnly || r.isVeg

    return matchesSearch && matchesCuisine && matchesVeg
  })
}, [restaurants, searchTerm, cuisine, vegOnly])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400 text-sm">Loading restaurants...</div>
    </div>
  )

  // if (error) return (
  //   <div className="flex items-center justify-center h-64">
  //     <div className="text-red-400 text-sm">Error: {error}</div>
  //   </div>
  // )

  return (
    <div className="space-y-6">

      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search restaurants, cuisines, or areas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition bg-white"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
  {cuisines.map(c => (
    <button
      key={c}
      onClick={() => setCuisine(c)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
        cuisine === c
          ? 'bg-orange-500 text-white border-orange-500'
          : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
      }`}
    >
      {c === 'all' ? 'All' : c}
    </button>
  ))}

  {/* Veg toggle */}
  <button
    onClick={() => setVegOnly(!vegOnly)}
    className={`px-4 py-1.5 rounded-full text-sm font-medium transition border flex items-center gap-2 ${
      vegOnly
        ? 'bg-green-500 text-white border-green-500'
        : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
    }`}
  >
    <span className="w-3 h-3 rounded-sm border-2 border-current" />
    Veg only
  </button>
</div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(restaurant => (
          <RestuarentCard key={restaurant.id} restaurent={restaurant} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No restaurants found for "{searchTerm}"
        </div>
      )}

    </div>
  )
}