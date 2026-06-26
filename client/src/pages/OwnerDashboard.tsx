import { useReducer } from "react";

export function OwnerDashboard() {
  const initialState = {
    name: '',
    cuisine: '',
    address: '',
    area: '',
    isVeg: false,
    long: '',
    lat: '',
    description: '',
    openingHour: '',
    phone: ''
  }

  type State = typeof initialState
  type Action =
    | { type: "UPDATE_FIELD"; field: keyof State; value: string | boolean }
    | { type: 'RESET' }

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { ...state, [action.field]: action.value }
      case 'RESET':
        return initialState
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm()) {
      console.log('Form is invalid')
      return
    }
    console.log('Form is valid, ready to submit:', state)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.type === 'checkbox' ? target.checked : target.value

    dispatch({
      type: "UPDATE_FIELD",
      field: target.name as keyof State,
      value: value
    })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' })
  }

  const isValidForm = () => {
    return (state.name !== '' && state.cuisine !== '' && state.area !== '' && state.long !== '' && state.lat !== '' && state.openingHour !== '' && state.address !== '' && state.phone !== '')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Your Restaurant</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Name *
            </label>
            <input
              type="text"
              value={state.name}
              name="name"
              onChange={handleChange}
              placeholder="e.g., Paragon Restaurant"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine *
            </label>
            <input
              type="text"
              value={state.cuisine}
              name="cuisine"
              onChange={handleChange}
              placeholder="e.g., Kerala, Italian"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              value={state.address}
              name="address"
              onChange={handleChange}
              placeholder="Full address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area *
            </label>
            <input
              type="text"
              value={state.area}
              name="area"
              onChange={handleChange}
              placeholder="e.g., Kozhikode"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Latitude & Longitude */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude *
              </label>
              <input
                type="text"
                value={state.lat}
                name="lat"
                onChange={handleChange}
                placeholder="e.g., 11.2588"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude *
              </label>
              <input
                type="text"
                value={state.long}
                name="long"
                onChange={handleChange}
                placeholder="e.g., 75.7804"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opening Hours *
            </label>
            <input
              type="text"
              value={state.openingHour}
              name="openingHour"
              onChange={handleChange}
              placeholder="e.g., 10:00 AM - 11:00 PM"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="text"
              value={state.phone}
              name="phone"
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Vegetarian */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={state.isVeg}
              name="isVeg"
              onChange={handleChange}
              className="h-4 w-4 text-orange-500 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Fully Vegetarian Restaurant
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={state.description}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={handleChange as any}
              placeholder="Tell us about your restaurant..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!isValidForm()}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                isValidForm()
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add Restaurant
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}