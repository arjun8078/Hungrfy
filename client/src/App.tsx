import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { useAuth } from "./context/AuthContext"
import { Layout } from "./components/Layout"



function App() {

   const { isLoggedIn } = useAuth()

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" /> : <Login />
        } />
        
        <Route element={
          isLoggedIn ? <Layout /> : <Navigate to="/login" />
        }>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
