'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  placeholder?: string
  className?: string
  variant?: 'default' | 'glass'
}

export default function DatePicker({ value, onChange, placeholder = "Select date", className = "", variant = "default" }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null)
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
    setSelectedDate(date)
    onChange(date.toISOString().split('T')[0])
    setIsOpen(false)
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

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
    onChange(today.toISOString().split('T')[0])
    setIsOpen(false)
  }

  const clearDate = () => {
    setSelectedDate(null)
    onChange('')
    setIsOpen(false)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const days = getDaysInMonth(currentDate)

  const isGlass = variant === 'glass'
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isGlass ? 'text-white/60' : 'text-gray-400'}`} />
        <input
          type="text"
          value={selectedDate ? formatDate(selectedDate) : ''}
          placeholder={placeholder}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full pl-12 pr-4 py-4 border rounded-lg focus:outline-none cursor-pointer transition-all duration-200 ${
            isGlass 
              ? 'border-white/20 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 text-white placeholder-white/50 bg-white/10 backdrop-blur-sm' 
              : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white'
          }`}
        />
        <Calendar className={`absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isGlass ? 'text-white/60' : 'text-gray-400'}`} />
      </div>

             {isOpen && (
         <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                     {/* Header */}
           <div className="flex items-center justify-between p-4 border-b border-gray-100">
             <button
               onClick={() => navigateMonth('prev')}
               className="p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600"
             >
               <ChevronLeft className="h-4 w-4" />
             </button>
             
             <div className="flex items-center gap-2">
               <span className="text-lg font-semibold text-gray-900">
                 {currentDate.toLocaleDateString('en-US', { month: 'long' })}
               </span>
               <select
                 value={currentDate.getFullYear()}
                 onChange={(e) => {
                   const newDate = new Date(currentDate)
                   newDate.setFullYear(parseInt(e.target.value))
                   setCurrentDate(newDate)
                 }}
                 className="text-lg font-semibold bg-transparent border-none outline-none cursor-pointer transition-colors appearance-none pr-6 relative text-gray-900 hover:text-gray-700"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                   backgroundPosition: 'right 0.25rem center',
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: '1.5em 1.5em'
                 }}
               >
                 {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                   <option key={year} value={year} className="text-gray-900">
                     {year}
                   </option>
                 ))}
               </select>
             </div>
             
             <button
               onClick={() => navigateMonth('next')}
               className="p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600"
             >
               <ChevronRight className="h-4 w-4" />
             </button>
           </div>

                     {/* Calendar Grid */}
           <div className="p-4">
             {/* Days of week */}
             <div className="grid grid-cols-7 gap-1 mb-2">
               {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                 <div key={day} className="text-center text-sm font-medium py-2 text-gray-500">
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
                     relative p-2 text-sm rounded-lg transition-all duration-200
                     ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'} hover:bg-blue-50
                     ${isToday(date) ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                     ${isSelected(date) ? 'bg-blue-600 text-white font-semibold hover:bg-blue-700' : ''}
                     ${!isCurrentMonth && isSelected(date) ? 'bg-blue-400 text-white' : ''}
                   `}
                 >
                   {date.getDate()}
                   {isToday(date) && !isSelected(date) && (
                     <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"></div>
                   )}
                 </button>
               ))}
             </div>
           </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={clearDate}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Clear
            </button>
            <button
              onClick={goToToday}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 