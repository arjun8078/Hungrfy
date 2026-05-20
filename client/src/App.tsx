import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useAuth } from "./context/AuthContext"
import { Layout } from "./components/Layout"
import { Register } from "./pages/Register"
import { RestaurantDetail } from "./components/RestaurantDetail"




function App() {

   const { isLoggedIn } = useAuth()

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" /> : <Login />
        } />
         <Route path="/register" element={
          isLoggedIn ? <Navigate to="/" /> : <Register />
        } />
        
        <Route element={
          isLoggedIn ? <Layout /> : <Navigate to="/login" />
        }>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
