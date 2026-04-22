import {  useEffect, useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"


type Restaurent={
    id:number,
    name:string,
    cuisine:string,
    area:string,
    rating:number
}




export function Home(){

    const [restaurants, setRestaurants] = useState<Restaurent[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading,setLoading]= useState(true)
    const [error, setError] = useState<string | null>(null)

    const { user, login, logout, isLoggedIn } = useAuth()

    const searchFocus=useRef<HTMLInputElement>(null);

    const apiCount=useRef(0)

    useEffect(()=>{
        if (!loading) {
    searchFocus.current?.focus()
  }
    },[loading])

     useEffect(() => {
        const controller=new AbortController()
        apiCount.current+=1
         console.log('API called', apiCount.current, 'times')
        fetch('https://jsonplaceholder.typicode.com/users',{signal: controller.signal}).then(
            res=>{
                if(!res.ok){
                    throw new Error("Failed to fetch restaurants")
                }
                return res.json()
            }
        ).then(data=>{
             const mapped = data.slice(0, 6).map((u: any) => ({
          id: u.id,
          name: u.name,
          cuisine: 'Kerala',
          area: u.address.city,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1))
        }))
        setRestaurants(mapped)
        setLoading(false)
        }).catch(err=>{
             if (err.name === 'AbortError') return  
            setError(err.message)
            setLoading(false)
        })

        return () => controller.abort()
  }, [])
  
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <p>Loading restaurants...</p>
  if(error) return <p>Error: {error}</p>

    return <>
         <div>
      <h1>PlateUp</h1>
      <div>
  {isLoggedIn ? (
    <div>
      <span>Hello, {user?.name} {user?.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <button onClick={() => login({ 
      name: 'Arjun', 
      email: 'arjun@test.com', 
      role: 'customer' 
    })}>
      Quick Login
    </button>
  )}
</div>
      <input
       ref={searchFocus}
        type="text"
        
        placeholder="Search restaurants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filtered.map(restaurant => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.cuisine} • {restaurant.area} • ⭐ {restaurant.rating}</p>
        </div>
      ))}
      {filtered.length === 0 && <p>No restaurants found</p>}
    </div>
    </>
}