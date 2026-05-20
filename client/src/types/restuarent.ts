export type Restaurant = {
  id: number
  name: string
  cuisine: string
  area: string
  rating: number,
  isVeg: boolean 
}

export type MenuItem = {
  id: number
  name: string
  price: number
  category: 'starters' | 'main course' | 'dessert' | 'drinks'
  isVeg: boolean
}

export type RestaurantDetail = {
  id: number
  name: string
  cuisine: string
  area: string
  rating: number
  description: string
  address: string
  phone: string
  openingHours: string
  menu: MenuItem[]
}