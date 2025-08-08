'use client'

import { useState, useRef, useEffect } from 'react'
import { Users, Bed, User, Baby, Minus, Plus } from 'lucide-react'

interface TravelerData {
  rooms: number
  adults: number
  children: number
}

interface TravelerSelectorProps {
  value: TravelerData
  onChange: (data: TravelerData) => void
  className?: string
  label?: string
}

export default function TravelerSelector({ 
  value, 
  onChange, 
  className = "",
  label
}: TravelerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localValue, setLocalValue] = useState<TravelerData>(value)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleIncrement = (type: keyof TravelerData) => {
    const newValue = { ...localValue, [type]: localValue[type] + 1 }
    
    // Smart validation: ensure rooms don't exceed total people
    if (type === 'rooms') {
      const totalPeople = newValue.adults + newValue.children
      if (newValue.rooms > totalPeople) {
        newValue.rooms = totalPeople
      }
    }
    
    setLocalValue(newValue)
  }

  const handleDecrement = (type: keyof TravelerData) => {
    if (localValue[type] > 0) {
      const newValue = { ...localValue, [type]: localValue[type] - 1 }
      
      // Smart validation: when reducing people, also reduce rooms if needed
      if (type === 'adults' || type === 'children') {
        const totalPeople = newValue.adults + newValue.children
        if (newValue.rooms > totalPeople) {
          newValue.rooms = totalPeople
        }
      }
      
      setLocalValue(newValue)
    }
  }

  const handleSave = () => {
    onChange(localValue)
    setIsOpen(false)
  }

  const handleReset = () => {
    const resetValue = { rooms: 1, adults: 2, children: 0 }
    setLocalValue(resetValue)
    onChange(resetValue)
  }



  const CounterRow = ({ 
    type, 
    icon, 
    label, 
    value: count, 
    min = 0 
  }: { 
    type: keyof TravelerData
    icon: React.ReactNode
    label: string
    value: number
    min?: number
  }) => {
    // Check if room increment should be disabled
    const isRoomIncrementDisabled = type === 'rooms' && 
      count >= (localValue.adults + localValue.children)
    
    return (
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="text-gray-600">
            {icon}
          </div>
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement(type)}
            disabled={count <= min}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="w-12 h-8 border border-gray-300 rounded flex items-center justify-center bg-white">
            <span className="text-gray-900 font-medium">{count}</span>
          </div>
          <button
            onClick={() => handleIncrement(type)}
            disabled={isRoomIncrementDisabled}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-900">{label}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 bg-white text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{value.rooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{value.adults + value.children}</span>
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rooms and guests</h3>
            
            <div className="space-y-2">
              <CounterRow
                type="rooms"
                icon={<Bed className="h-5 w-5" />}
                label="Rooms"
                value={localValue.rooms}
                min={1}
              />
              
              <div className="border-t border-gray-200 my-2"></div>
              
              <CounterRow
                type="adults"
                icon={<User className="h-5 w-5" />}
                label="Adults"
                value={localValue.adults}
                min={1}
              />
              
              <CounterRow
                type="children"
                icon={<Baby className="h-5 w-5" />}
                label="Children"
                value={localValue.children}
                min={0}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 