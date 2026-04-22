import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useAuth } from "./context/AuthContext"



function App() {

   const { isLoggedIn } = useAuth()

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
