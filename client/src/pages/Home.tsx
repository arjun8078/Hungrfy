import {  useEffect, useRef, useState } from "react"
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
  const [error, setError] = useState<string | null>(null)

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!loading) searchRef.current?.focus()
  }, [loading])

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        const mapped = data.slice(0, 6).map((u: any) => ({
          id: u.id,
          name: u.name,
          cuisine: 'Kerala',
          area: u.address.city,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1))
        }))
        setRestaurants(mapped)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400 text-sm">Loading restaurants...</div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-400 text-sm">Error: {error}</div>
    </div>
  )

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