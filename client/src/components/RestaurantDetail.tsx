import { useNavigate, useParams } from "react-router-dom"
import type { RestaurantDetail as RestaurantDetailType, MenuItem } from '../types/restuarent'
import { useEffect, useState } from "react"
import {api} from '../services/api'



function MenuSection({ title, items }: { title: string, items: MenuItem[] }){
if (items.length === 0) return null

 return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className={`w-4 h-4 rounded-sm border-2 flex-shrink-0 ${
                item.isVeg 
                  ? 'border-green-500' 
                  : 'border-red-500'
              }`}>
                <span className={`block w-2 h-2 rounded-full m-auto mt-0.5 ${
                  item.isVeg ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </span>
              <span className="text-sm text-gray-800">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">₹{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RestaurantDetail() {

    const {id}=useParams()
    const navigate=useNavigate()

    const [restaurant, setRestaurant] = useState<RestaurantDetailType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const controller = new AbortController()

  api.getRestaurant(id!)
    .then(data => {
      setRestaurant(data)
      setLoading(false)
    })
    .catch(err => {
      if (err.name === 'AbortError') return
      setError(err.message)
      setLoading(false)
    })

  return () => controller.abort()
}, [id])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400 text-sm">Loading restaurant...</div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-400 text-sm">{error}</div>
    </div>
  )

  if (!restaurant) return null

  const categories = ['starters', 'main course', 'dessert', 'drinks'] as const


     return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
      >
        ← Back
      </button>

      {/* Hero image placeholder */}
      <div className="w-full h-48 bg-gray-100 rounded-xl" />

      {/* Restaurant info */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
            <p className="text-gray-500 mt-1">{restaurant.cuisine} • {restaurant.area}</p>
          </div>
          <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg">
            <span className="text-orange-500 text-sm">★</span>
            <span className="text-sm font-semibold text-gray-800">{restaurant.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {restaurant.description}
        </p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-3 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">📍</span>
          <span className="text-gray-700">{restaurant.address}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">📞</span>
          <span className="text-gray-700">{restaurant.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">🕐</span>
          <span className="text-gray-700">{restaurant.openingHours}</span>
        </div>
      </div>

      {/* Menu */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Menu</h2>
        {categories.map(category => (
          <MenuSection
            key={category}
            title={category}
            items={restaurant.menu.filter(item => item.category === category)}
          />
        ))}
      </div>

    </div>
  )

}