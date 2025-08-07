'use client'

import { ArrowRight } from 'lucide-react'

const destinations = [
  { name: 'Egypt', tours: 5, image: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
  { name: 'USA', tours: 7, image: 'bg-gradient-to-br from-blue-400 to-indigo-500' },
  { name: 'Turkey', tours: 6, image: 'bg-gradient-to-br from-red-400 to-pink-500' },
  { name: 'Australia', tours: 4, image: 'bg-gradient-to-br from-green-400 to-teal-500' },
  { name: 'France', tours: 8, image: 'bg-gradient-to-br from-purple-400 to-pink-500' },
  { name: 'Greece', tours: 6, image: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
]

export default function PopularDestinations() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our most sought-after destinations and discover amazing experiences waiting for you.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors"
          >
            <span>All Destinations</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className={`relative h-64 rounded-2xl ${destination.image} overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300`}
            >
              {/* Tour Count Badge */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                {destination.tours} tours
              </div>
              
              {/* Destination Name */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-2xl font-bold">
                  {destination.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 