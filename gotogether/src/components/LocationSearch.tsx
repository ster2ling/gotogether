'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Search, Globe, Building2, Mountain, Flag } from 'lucide-react'
import { searchPlaces } from '@/services/placesApi'

interface LocationSuggestion {
  id: string
  name: string
  type: 'city' | 'region' | 'country'
  country?: string
  region?: string
  displayName: string
}

interface LocationSearchProps {
  value: string
  onChange: (location: string) => void
  placeholder?: string
  className?: string
  label?: string
}

export default function LocationSearch({ 
  value, 
  onChange, 
  placeholder = "Where to?", 
  className = "",
  label
}: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchQuery, setSearchQuery] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      setShowWarning(false)
      setIsOpen(false)
      return
    }

    // Debounced API call
    setIsLoading(true)
    const timer = setTimeout(async () => {
      try {
        const results = await searchPlaces(searchQuery)
        setSuggestions(results)
        setIsOpen(results.length > 0)
        setShowWarning(results.length === 0 && searchQuery.length >= 2)
      } catch (error) {
        console.error('Error searching places:', error)
        setSuggestions([])
        setShowWarning(true)
      } finally {
        setIsLoading(false)
        setSelectedIndex(-1)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchQuery(newValue)
    onChange(newValue)
  }

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setSearchQuery(suggestion.displayName)
    onChange(suggestion.displayName)
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const getTypeIcon = (type: LocationSuggestion['type']) => {
    switch (type) {
      case 'city':
        return <Building2 className="h-4 w-4" />
      case 'region':
        return <Mountain className="h-4 w-4" />
      case 'country':
        return <Flag className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: LocationSuggestion['type']) => {
    switch (type) {
      case 'city':
        return 'City'
      case 'region':
        return 'Region'
      case 'country':
        return 'Country'
      default:
        return 'Location'
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-900">{label}</span>
        </div>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true)
          }}
          placeholder={placeholder}
          className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                ${selectedIndex === index ? 'bg-teal-50 border-l-4 border-teal-500' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-400">
                  {getTypeIcon(suggestion.type)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{suggestion.name}</div>
                  <div className="text-sm text-gray-500">{suggestion.displayName.replace(suggestion.name + ', ', '')}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 font-medium">
                {getTypeLabel(suggestion.type)}
              </div>
            </button>
          ))}
        </div>
      )}

      {showWarning && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-orange-50 border border-orange-200 rounded-lg p-4 z-50">
          <div className="flex items-start gap-3">
            <div className="text-orange-500 mt-0.5">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-orange-800">
                Enter a city, region, or country
              </div>
              <div className="text-sm text-orange-700 mt-1">
                We couldn't find a close match.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 