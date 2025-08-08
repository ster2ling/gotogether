'use client'

import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function SearchBar() {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedGuests, setSelectedGuests] = useState('2 guests, 1 room')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [customGuests, setCustomGuests] = useState({ guests: 2, rooms: 1 })
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  const dateInputRef = useRef<HTMLInputElement>(null)

  // Google Places API Key - You'll need to get this from Google Cloud Console
  // const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || 'YOUR_API_KEY_HERE'

  const searchLocations = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    try {
      // For now, use a working fallback search since API key isn't set up
      const commonCountries = [
        'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
        'France', 'Japan', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 
        'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 
        'Portugal', 'Greece', 'Poland', 'Czech Republic', 'Hungary', 
        'Slovakia', 'Slovenia', 'Croatia', 'Serbia', 'Bulgaria', 'Romania'
      ]
      
      const results = commonCountries.map(country => ({
        description: `${query}, ${country}`
      }))
      
      // Add some popular cities with the search term
      const popularCities = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
        'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
        'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
        'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville',
        'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville',
        'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
        'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh',
        'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa',
        'Arlington', 'Tampa', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield',
        'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Corpus Christi', 'Riverside',
        'Lexington', 'Stockton', 'Henderson', 'Saint Paul', 'St. Louis', 'Fort Wayne',
        'Jersey City', 'Chandler', 'Greensboro', 'North Las Vegas', 'Anchorage',
        'Lincoln', 'Orlando', 'Irvine', 'Newark', 'Durham', 'Chula Vista',
        'Toledo', 'Fort Lauderdale', 'Laredo', 'Lubbock', 'Garland', 'Glendale',
        'Hialeah', 'Reno', 'Baton Rouge', 'Irvine', 'Spokane', 'Fremont',
        'Montgomery', 'Modesto', 'Fayetteville', 'Shreveport', 'San Bernardino',
        'Tacoma', 'Fontana', 'Oxnard', 'Moreno Valley', 'Frisco', 'Huntington Beach',
        'Yonkers', 'Glendale', 'Aurora', 'Montgomery', 'Columbus', 'Amarillo',
        'Little Rock', 'Akron', 'Winston-Salem', 'Grand Rapids', 'Salt Lake City',
        'Tallahassee', 'Huntsville', 'Worcester', 'Knoxville', 'Grand Prairie',
        'Newport News', 'Brownsville', 'Santa Clarita', 'Overland Park', 'Garden Grove',
        'Oceanside', 'Tempe', 'Dayton', 'Chattanooga', 'Mobile', 'Cape Coral',
        'Shreveport', 'Frisco', 'Cary', 'Fayetteville', 'Corona', 'Frederick',
        'McKinney', 'Lancaster', 'Sioux Falls', 'Worcester', 'Ann Arbor', 'Fullerton',
        'Abilene', 'Evansville', 'Roseville', 'Independence', 'Denton', 'Springfield',
        'Vallejo', 'Athens', 'Provo', 'Peoria', 'Lansing', 'El Monte', 'Midland',
        'Berkeley', 'Norman', 'Downey', 'Waterbury', 'Murfreesboro', 'Inglewood',
        'Westminster', 'Rochester', 'Odessa', 'Manchester', 'Elgin', 'West Covina',
        'Clearwater', 'Waterbury', 'Gresham', 'Fargo', 'Arvada', 'Carlsbad',
        'Westminster', 'Rochester', 'Gresham', 'Fargo', 'Arvada', 'Carlsbad',
        'Westminster', 'Rochester', 'Gresham', 'Fargo', 'Arvada', 'Carlsbad'
      ]
      
      const cityResults = popularCities
        .filter(city => city.toLowerCase().includes(query.toLowerCase()))
        .map(city => ({
          description: `${city}, United States`
        }))
      
      setSearchResults([...cityResults, ...results.slice(0, 5)])
      
    } catch (error) {
      console.error('Error searching locations:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    // Debounce search to avoid too many API calls
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(locationSearch)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [locationSearch])

  const handleGuestChange = (type: 'guests' | 'rooms', value: number) => {
    const newGuests = type === 'guests' ? value : customGuests.guests
    const newRooms = type === 'rooms' ? value : customGuests.rooms
    
    // Ensure rooms don't exceed guests
    const finalRooms = Math.min(newRooms, newGuests)
    
    setCustomGuests({
      guests: newGuests,
      rooms: finalRooms
    })
    
    setSelectedGuests(`${newGuests} guest${newGuests > 1 ? 's' : ''}, ${finalRooms} room${finalRooms > 1 ? 's' : ''}`)
  }

  const handleDateClick = () => {
    setFocusedField('date')
    dateInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4">
          {/* Location */}
          <div className="flex-1 relative">
            <div 
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                focusedField === 'location' 
                  ? 'border-teal-500 bg-teal-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setFocusedField('location')
                setShowLocationDropdown(!showLocationDropdown)
              }}
            >
              <MapPin className={`h-5 w-5 ${
                focusedField === 'location' ? 'text-teal-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Location</div>
                <div className="text-sm text-gray-500">
                  {selectedLocation || 'Where are you going?'}
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                showLocationDropdown ? 'rotate-180' : ''
              }`} />
            </div>
            
            {/* Location Dropdown */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-48 overflow-y-auto">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search any location in the world..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>
                
                {/* Search Results */}
                <div className="max-h-64 overflow-y-auto">
                  {isSearching ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        onClick={() => {
                          setSelectedLocation(result.description)
                          setShowLocationDropdown(false)
                          setFocusedField(null)
                          setLocationSearch('')
                          setSearchResults([])
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-800">{result.description}</span>
                        </div>
                      </div>
                    ))
                  ) : locationSearch.length > 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No locations found. Try a different search.
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Start typing to search locations...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="flex-1">
            <div 
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                focusedField === 'date' 
                  ? 'border-teal-500 bg-teal-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={handleDateClick}
            >
              <Calendar className={`h-5 w-5 ${
                focusedField === 'date' ? 'text-teal-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Date</div>
                <div className="text-sm text-gray-500">
                  {selectedDate || 'Select date'}
                </div>
              </div>
              <input
                ref={dateInputRef}
                type="date"
                className="hidden"
                onFocus={() => setFocusedField('date')}
                onBlur={() => setFocusedField(null)}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 relative">
            <div 
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                focusedField === 'guests' 
                  ? 'border-teal-500 bg-teal-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setFocusedField('guests')
                setShowGuestsDropdown(!showGuestsDropdown)
              }}
            >
              <Users className={`h-5 w-5 ${
                focusedField === 'guests' ? 'text-teal-600' : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Guests</div>
                <div className="text-sm text-gray-500">{selectedGuests}</div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                showGuestsDropdown ? 'rotate-180' : ''
              }`} />
            </div>
            
            {/* Guests Dropdown */}
            {showGuestsDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                <div className="p-4 space-y-4">
                  {/* Guests Counter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Guests</label>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleGuestChange('guests', Math.max(1, customGuests.guests - 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-600"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-gray-900">{customGuests.guests}</span>
                      <button
                        onClick={() => handleGuestChange('guests', customGuests.guests + 1)}
                        className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Rooms Counter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Rooms</label>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleGuestChange('rooms', Math.max(1, customGuests.rooms - 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-600"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-gray-900">{customGuests.rooms}</span>
                      <button
                        onClick={() => handleGuestChange('rooms', Math.min(customGuests.guests, customGuests.rooms + 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <button
                    onClick={() => {
                      setShowGuestsDropdown(false)
                      setFocusedField(null)
                    }}
                    className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button 
            className="px-8 py-4 bg-black text-white rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  )
} 