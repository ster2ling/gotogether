'use client'

import { Search, Calendar } from 'lucide-react'
import { useState } from 'react'
import DateRangePicker from './DateRangePicker'
import LocationSearch from './LocationSearch'
import TravelerSelector from './TravelerSelector'

interface TravelerData {
  rooms: number
  adults: number
  children: number
}

export default function SearchSection() {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [travelers, setTravelers] = useState<TravelerData>({
    rooms: 1,
    adults: 2,
    children: 0
  })

  return (
    <section className="w-[1200px] mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to search?</h2>
          <p className="text-gray-600">Find your perfect destination and start planning</p>
        </div>
        
        <div className="flex items-end gap-4 p-4 bg-gray-50 rounded-xl ring-2 ring-black/5">
          <div className="flex-1">
            <LocationSearch
              value={location}
              onChange={setLocation}
              placeholder="Search destinations"
              label="Where"
            />
          </div>
          
          <div className="flex-1">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              placeholder="Check-in - Check-out"
              label="When"
            />
          </div>
          
          <div className="flex-1">
            <TravelerSelector
              value={travelers}
              onChange={setTravelers}
              label="Guests"
            />
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors" style={{ height: '48px' }}>
            <Search className="h-4 w-4" />
            <span className="font-semibold">Search</span>
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Popular destinations: <span className="text-teal-600 cursor-pointer hover:underline">Maldives</span>, <span className="text-teal-600 cursor-pointer hover:underline">Swiss Alps</span>, <span className="text-teal-600 cursor-pointer hover:underline">Tokyo</span>, <span className="text-teal-600 cursor-pointer hover:underline">Paris</span>
          </p>
        </div>
      </div>
    </section>
  )
} 