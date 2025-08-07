'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface DateRangePickerProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  placeholder?: string
  className?: string
  label?: string
}

export default function DateRangePicker({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  placeholder = "Select dates", 
  className = "",
  label
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(startDate ? new Date(startDate) : null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate ? new Date(endDate) : null)
  const [isSelectingEnd, setIsSelectingEnd] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const formatDateRange = () => {
    if (selectedStartDate && selectedEndDate) {
      return `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`
    } else if (selectedStartDate) {
      return `${formatDate(selectedStartDate)} - Select end date`
    }
    return ''
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add days from previous month
    const prevMonth = new Date(year, month - 1, 0)
    const daysInPrevMonth = prevMonth.getDate()
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false
      })
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }
    
    return days
  }

  const handleDateSelect = (date: Date) => {
    if (!isSelectingEnd) {
      // Selecting start date
      setSelectedStartDate(date)
      onStartDateChange(date.toISOString().split('T')[0])
      setIsSelectingEnd(true)
    } else {
      // Selecting end date
      if (date >= selectedStartDate!) {
        setSelectedEndDate(date)
        onEndDateChange(date.toISOString().split('T')[0])
        setIsSelectingEnd(false)
      } else {
        // If end date is before start date, swap them
        setSelectedEndDate(selectedStartDate)
        setSelectedStartDate(date)
        onStartDateChange(date.toISOString().split('T')[0])
        onEndDateChange(selectedStartDate!.toISOString().split('T')[0])
        setIsSelectingEnd(false)
      }
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentDate(prev => {
        const newDate = new Date(prev)
        if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1)
        } else {
          newDate.setMonth(newDate.getMonth() + 1)
        }
        return newDate
      })
      setIsAnimating(false)
    }, 150)
  }

  const clearDates = () => {
    setSelectedStartDate(null)
    setSelectedEndDate(null)
    onStartDateChange('')
    onEndDateChange('')
    setIsSelectingEnd(false)
    setIsOpen(false)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString() && !selectedStartDate
  }

  const isInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false
    return date >= selectedStartDate && date <= selectedEndDate
  }

  const isStartDate = (date: Date) => {
    return selectedStartDate && date.toDateString() === selectedStartDate.toDateString()
  }

  const isEndDate = (date: Date) => {
    return selectedEndDate && date.toDateString() === selectedEndDate.toDateString()
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-900">{label}</span>
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={formatDateRange()}
          placeholder={placeholder}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 cursor-pointer bg-white"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Selection Status */}
          <div className="px-4 py-2 bg-teal-50 border-b border-gray-100">
            <div className="text-sm text-teal-900">
              {isSelectingEnd ? 'Select end date' : 'Select start date'}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className={`grid grid-cols-7 gap-1 transition-opacity duration-150 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
              {days.map(({ date, isCurrentMonth }, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    relative p-2 text-sm rounded-lg transition-all duration-200 hover:bg-teal-50
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                    ${isToday(date) ? 'bg-teal-100 text-teal-700 font-semibold' : ''}
                    ${isInRange(date) ? 'bg-teal-100' : ''}
                    ${isStartDate(date) ? 'bg-teal-600 text-white font-semibold hover:bg-teal-700' : ''}
                    ${isEndDate(date) ? 'bg-teal-600 text-white font-semibold hover:bg-teal-700' : ''}
                    ${!isCurrentMonth && (isStartDate(date) || isEndDate(date)) ? 'bg-teal-400 text-white' : ''}
                  `}
                >
                  {date.getDate()}
                  {isToday(date) && !isStartDate(date) && !isEndDate(date) && (
                    <div className="absolute inset-0 border-2 border-teal-500 rounded-lg pointer-events-none"></div>
                  )}
                  {isStartDate(date) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-teal-600 font-medium">
                      Start
                    </div>
                  )}
                  {isEndDate(date) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-teal-600 font-medium">
                      End
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={clearDates}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Clear
            </button>
            <div className="text-sm text-gray-500">
              {selectedStartDate && selectedEndDate && (
                <span>
                  {Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 