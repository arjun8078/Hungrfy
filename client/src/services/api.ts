const BASE_URL=import .meta.env.VITE_API_URL 
export const api = {
  getRestaurants: async () => {
    const res = await fetch(`${BASE_URL}/restaurants`)
    if (!res.ok) throw new Error('Failed to fetch restaurants')
    return res.json()
  },

  getRestaurant: async (id: string) => {
    const res = await fetch(`${BASE_URL}/restaurants/${id}`)
    if (!res.ok) throw new Error('Failed to fetch restaurant')
    return res.json()
  }
}