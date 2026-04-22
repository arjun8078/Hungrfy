import { createContext, useContext, useState } from "react"

type User={
    name:string,
    email:string,
    role:'customer' | 'owner'
}

type AuthContextType={
    user:User | null,
    login:(user:User)=>void,
    logout:()=>void,
    isLoggedIn:boolean
}

const AuthContext=createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){

    const [user, setUser] = useState<User | null>(null)
    const login=(user:User)=>setUser(user)
    const logout=()=>setUser(null)

    return(
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user}}>
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