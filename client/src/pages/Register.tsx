import { useReducer, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

 const initialState={
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    type State= typeof initialState

    type Action=| { type: 'UPDATE_FIELD'; field: keyof State; value: string }
  | { type: 'RESET' }

  function reducer(state: State, action: Action): State {
    switch(action.type){
        case 'UPDATE_FIELD':
            return{...state, [action.field]: action.value}
        case 'RESET':
            return initialState
        default:
            return state}
    }

export function Register(){

    const [state,dispatch] = useReducer(reducer, initialState)
    const [errors, setErrors] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  })

  const { login } = useAuth()
  const navigate = useNavigate()

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ 
      type: 'UPDATE_FIELD', 
      field: e.target.name as keyof State, 
      value: e.target.value 
    })
  }

  const validate = () => {
    let valid = true
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' }

    if (!state.name) {
      newErrors.name = 'Name is required'
      valid = false
    }

    if (!state.email) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = 'Enter a valid email'
      valid = false
    }

    if (!state.password) {
      newErrors.password = 'Password is required'
      valid = false
    } else if (state.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      valid = false
    }

    if (!state.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
      valid = false
    } else if (state.password !== state.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    login({ name: state.name, email: state.email, role: 'customer' })
    navigate('/')
  }

   
  
return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 mt-1">Join PlateUp today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="Arjun A S"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')}
            className="text-orange-500 font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  )
}