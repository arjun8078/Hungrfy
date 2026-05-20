import { useNavigate } from "react-router-dom"
import type { Restaurant } from "../types/restuarent"


type Props = {
    restaurent: Restaurant
}



export function RestuarentCard({restaurent}:Props) {

  const navigate=useNavigate()

    return(
        <>
       <div
            key={restaurent.id}
            onClick={() => navigate(`/restaurant/${restaurent.id}`)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer"
          >
            {/* Image placeholder */}
            <div className="aspect-video bg-gray-100" />

            {/* Card content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{restaurent.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {restaurent.cuisine} • {restaurent.area}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-orange-500 text-sm">★</span>
                <span className="text-sm font-medium text-gray-700">
                  {restaurent.rating}
                </span>
              </div>
            </div>
          </div>
        </>
    )
}
