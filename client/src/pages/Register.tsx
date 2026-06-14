import { useReducer, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {api} from '../services/api'

 const initialState={
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        role:''
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
    confirmPassword: '' ,
    role:''
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
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' , role:'' }

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
    if (!state.role) {
  newErrors.role = 'Please select your role'
  valid = false
}

    setErrors(newErrors)
    return valid
  }

  const isFormValid=()=>{
    return state.name && state.email && state.password && state.confirmPassword && state.role && /\S+@\S+\.\S+/.test(state.email) && state.password.length >= 6 && state.password === state.confirmPassword 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return


    try {
      const response=await api.register(
        state.name,
        state.email,
        state.password,
        state.role
      )
      localStorage.setItem('token', response.token)
      login(response.user)
      if (response.user.role === 'owner') {
  navigate('/owner/dashboard')
} else {
  navigate('/')
}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
  setErrors(prev => ({
    ...prev,
    email: error.message
  }))
}
    
    

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
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-3">
    I am a:
  </label>
  <div className="flex gap-3">
    <button
      type="button"
      onClick={() => dispatch({ type: 'UPDATE_FIELD', field: 'role', value: 'customer' })}
      className={`flex-1 py-2 rounded-lg font-medium transition ${
        state.role === 'customer'
          ? 'bg-orange-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      🍽️ Customer
    </button>
    <button
      type="button"
      onClick={() => dispatch({ type: 'UPDATE_FIELD', field: 'role', value: 'owner' })}
      className={`flex-1 py-2 rounded-lg font-medium transition ${
        state.role === 'owner'
          ? 'bg-orange-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      🏪 Owner
    </button>
  </div>
  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
</div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full font-medium py-3 rounded-lg transition ${
  isFormValid()
    ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
}`}
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