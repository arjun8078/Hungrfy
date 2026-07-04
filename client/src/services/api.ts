type RestaurantData = {
  name: string
  cuisine: string
  area: string
  address: string
  lat: string
  long: string
  openingHour: string
  phone: string
  isVeg: boolean
  description: string
}

const BASE_URL=import.meta.env.VITE_API_URL 
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
  },

  register:async(name:string,email:string,password:string,role:string)=>{
    const res=await fetch(`${BASE_URL}/api/auth/register`,{
      method:'POST',
      headers:{'content-type': 'application/json'},
      body:JSON.stringify({name,email,password,role})
    })
    if (!res.ok) throw new Error('Failed to register')
    return res.json()
  },
  login:async(email:string,password:string)=>{
    const res=await fetch(`${BASE_URL}/api/auth/login`,{
      method:'POST',
      headers:{'Content-type': 'application/json'},
      body:JSON.stringify({email,password})
    })

    if (!res.ok) throw new Error('Failed to login')
    return res.json()

  },

  getProfile:async(token:string)=>{
    const res=await fetch(`${BASE_URL}/api/auth/me`,{
      method:'GET',
      headers:{'Content-type':'application/json','Authorization':`Bearer ${token}`}
      
    })
    if (!res.ok) throw new Error('Failed to fetch profile')
    return res.json()
  },

  addRestaurant:async(restaurantData: RestaurantData, token: string)=>{
    const res=await fetch(`${BASE_URL}/restaurants`,{
       method:'POST',
      headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
      },
    body:JSON.stringify(restaurantData)
  }
  )
  if(!res.ok ){
   const error = await res.json()
  throw new Error(error.error || 'Adding failed')  
    
  }
  return await res.json()
  }
}