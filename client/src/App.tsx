import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Register } from "./pages/Register";
import { RestaurantDetail } from "./components/RestaurantDetail";
import { OwnerDashboard } from "./pages/OwnerDashboard";

function App() {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route
  path="/login"
  element={
    !isLoggedIn ? <Login /> :
    user?.role === 'owner' ? <Navigate to="/owner/dashboard" /> :
    <Navigate to="/" />
  }
/>
<Route
  path="/register"
  element={
    !isLoggedIn ? <Register /> :
    user?.role === 'owner' ? <Navigate to="/owner/dashboard" /> :
    <Navigate to="/" />
  }
/>

         {/* Customer routes */}
<Route
  element={
    !isLoggedIn ? <Navigate to="/login" /> :
    user?.role === 'owner' ? <Navigate to="/owner/dashboard" /> :
    <Layout />
  }
>
  <Route path="/" element={<Home />} />
  <Route path="/restaurant/:id" element={<RestaurantDetail />} />
</Route>

{/* Owner routes */}
<Route
  path="/owner/dashboard"
  element={
    !isLoggedIn ? <Navigate to="/login" /> :
    user?.role === 'customer' ? <Navigate to="/" /> :
    <OwnerDashboard />
  }
/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
