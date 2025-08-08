'use client'

import { Search, Filter, Plus, Building, Star, ThumbsUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import DateRangePicker from '../../components/DateRangePicker'
import LocationSearch from '../../components/LocationSearch'
import TravelerSelector from '../../components/TravelerSelector'

interface TravelerData {
  rooms: number
  adults: number
  children: number
}

export default function SearchPage() {
  const { isAuthenticated, signup } = useAuth()
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [travelers, setTravelers] = useState<TravelerData>({
    rooms: 1,
    adults: 2,
    children: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  const handleTestBypass = () => {
    signup({
      id: 'test-user',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gotogether.com'
    })
  }

  useEffect(() => {
    // Add a small delay to allow authentication state to stabilize
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isAuthenticated) {
        // Store the current path to redirect back after signup
        sessionStorage.setItem('redirectAfterSignup', '/search')
        router.push('/auth/signup')
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign up or log in to access the search page.</p>
          
          {/* Test Bypass Button - Only visible in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="space-y-4">
              <button
                onClick={handleTestBypass}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-lg transition-colors"
              >
                🧪 Test Login (Development Only)
              </button>
              <p className="text-xs text-gray-500">Click to bypass authentication for testing</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Search and Results */}
      <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">GoTogether</h1>
              <p className="text-sm text-gray-600">Hotels and lodging</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Where</label>
                  <LocationSearch
                    value={location}
                    onChange={setLocation}
                    placeholder="Where"
                    label=""
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">When</label>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    placeholder="When"
                    label=""
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">Travelers</label>
                  <TravelerSelector
                    value={travelers}
                    onChange={setTravelers}
                    label=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Results */}
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Price Filter */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Price $89 - $2,294</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0 top-0 w-1/3 h-full bg-gray-400 rounded-full"></div>
                  <div className="absolute left-1/3 top-0 w-1 h-4 bg-black rounded-full -mt-1"></div>
                  <div className="absolute left-2/3 top-0 w-1 h-4 bg-black rounded-full -mt-1"></div>
                </div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 text-gray-700 hover:text-gray-900 transition-colors">
                  <Building className="h-4 w-4" />
                  <span className="text-xs font-medium">Property type</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-gray-700 hover:text-gray-900 transition-colors">
                  <Star className="h-4 w-4" />
                  <span className="text-xs font-medium">Hotel class</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-xs font-medium">Rated 8+</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-gray-700 hover:text-gray-900 transition-colors relative">
                  <Filter className="h-4 w-4" />
                  <span className="text-xs font-medium">All</span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">1</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="text-sm text-gray-600 mb-4">180 results</div>
            
            {/* Result Items */}
            <div className="space-y-4">
              {/* Beach Haven */}
              <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Beach Haven 1</h3>
                  <p className="text-xs text-gray-600 mb-1">Guest favorite • 6 years hosting • Private room</p>
                  <p className="text-xs text-gray-600 mb-2">1 bedroom • 1 shared bath</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">$75</span>
                      <span className="text-xs text-gray-500">Total $300</span>
                    </div>
                    <button className="flex items-center gap-1 px-2 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors">
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Lakeside Escape */}
              <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Lakeside Escape at Joy Cove</h3>
                  <p className="text-xs text-gray-600 mb-1">4 beds • 1 queen bed • 3 single beds</p>
                  <p className="text-xs text-gray-600 mb-2">Guest favorite • Entire home</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">$163</span>
                      <span className="text-xs text-gray-500">Total $653</span>
                    </div>
                    <button className="flex items-center gap-1 px-2 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors">
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Birmingham Tree House */}
              <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Birmingham Tree House Hotel</h3>
                  <p className="text-xs text-gray-600 mb-1">3-star hotel • Free Wi-Fi • Free parking</p>
                  <p className="text-xs text-gray-600 mb-2">Air conditioning • Pet-friendly • Fitness center</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">$180</span>
                      <span className="text-xs text-gray-500">Total $720</span>
                    </div>
                    <button className="flex items-center gap-1 px-2 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors">
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-3/5 bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-48 bg-gray-200 rounded-lg mb-4"></div>
            <p className="text-gray-600">Interactive map will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
} 