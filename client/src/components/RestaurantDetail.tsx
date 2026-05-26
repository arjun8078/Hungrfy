import { useNavigate, useParams } from "react-router-dom"
import type { RestaurantDetail as RestaurantDetailType, MenuItem } from '../types/restuarent'
import { useEffect, useState } from "react"
import {api} from '../services/api'

// const mockRestaurants: RestaurantDetailType[] = [
//   {
//     id: 1,
//     name: 'Paragon Restaurant',
//     cuisine: 'Kerala',
//     area: 'Kozhikode',
//     rating: 4.5,
//     description: 'One of the most iconic restaurants in Kerala, famous for authentic Malabar cuisine since 1939.',
//     address: 'Kannur Road, Kozhikode, Kerala',
//     phone: '+91 9876543210',
//     openingHours: '11:00 AM - 11:00 PM',
//     menu: [
//       { id: 1, name: 'Fish Curry', price: 180, category: 'main course', isVeg: false },
//       { id: 2, name: 'Prawn Biryani', price: 320, category: 'main course', isVeg: false },
//       { id: 3, name: 'Papadam', price: 20, category: 'starters', isVeg: true },
//       { id: 4, name: 'Banana Halwa', price: 60, category: 'dessert', isVeg: true },
//       { id: 5, name: 'Sulaimani Tea', price: 40, category: 'drinks', isVeg: true },
//     ]
//   },
//   {
//     id: 2,
//     name: 'Dhe Puttu',
//     cuisine: 'Kerala',
//     area: 'Kochi',
//     rating: 4.2,
//     description: 'Famous for its unique puttu varieties and traditional Kerala breakfast items.',
//     address: 'MG Road, Kochi, Kerala',
//     phone: '+91 9876543211',
//     openingHours: '7:00 AM - 10:00 PM',
//     menu: [
//       { id: 1, name: 'Puttu & Kadala', price: 80, category: 'main course', isVeg: true },
//       { id: 2, name: 'Appam & Stew', price: 120, category: 'main course', isVeg: true },
//       { id: 3, name: 'Banana Fritter', price: 40, category: 'starters', isVeg: true },
//       { id: 4, name: 'Payasam', price: 60, category: 'dessert', isVeg: true },
//       { id: 5, name: 'Filter Coffee', price: 30, category: 'drinks', isVeg: true },
//     ]
//   },
//   {
//     id: 3,
//     name: 'Thalassery Biriyani House',
//     cuisine: 'Malabar',
//     area: 'Kannur',
//     rating: 4.7,
//     description: 'Authentic Thalassery biryani made with the traditional Kaima rice and fresh spices.',
//     address: 'Town Hall Road, Kannur, Kerala',
//     phone: '+91 9876543212',
//     openingHours: '12:00 PM - 11:00 PM',
//     menu: [
//       { id: 1, name: 'Thalassery Biryani', price: 280, category: 'main course', isVeg: false },
//       { id: 2, name: 'Chicken Fry', price: 220, category: 'starters', isVeg: false },
//       { id: 3, name: 'Raita', price: 40, category: 'starters', isVeg: true },
//       { id: 4, name: 'Unniyappam', price: 50, category: 'dessert', isVeg: true },
//       { id: 5, name: 'Lime Juice', price: 40, category: 'drinks', isVeg: true },
//     ]
//   }
// ]

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