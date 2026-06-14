import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

type User={
    name:string,
    email:string,
    role:'customer' | 'owner'
}

type AuthContextType={
    user:User | null,
    login:(user:User)=>void,
    logout:()=>void,
    isLoggedIn:boolean,
    isLoading:boolean
}

const AuthContext=createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){

    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const login=(user:User)=>setUser(user)
    const logout=()=>setUser(null)

    useEffect( ()=>{
        const token=localStorage.getItem('token')

        const restore=async()=>{
            try {
                if(token){
            const response= await api.getProfile(token)
            login(response.user)
            
        }
        setIsLoading(false)
            } catch (error) {
                console.log(error);
                setIsLoading(false)
                
            }
        }
        restore()

        
    },[])

    return(
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

    

}

export function useAuth(){
    const context=useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}