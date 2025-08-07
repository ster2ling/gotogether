'use client'

import { MapPin, Calendar, Users, Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Location */}
          <div className="flex-1 w-full">
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <MapPin className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex-1 w-full">
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <Calendar className="h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 w-full">
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <Users className="h-5 w-5 text-gray-400" />
              <select className="flex-1 outline-none text-gray-700 bg-transparent">
                <option>2 guests, 1 room</option>
                <option>1 guest, 1 room</option>
                <option>3 guests, 1 room</option>
                <option>4 guests, 2 rooms</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  )
} 