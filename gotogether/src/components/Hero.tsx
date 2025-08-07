'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroProps {
  onStartPlanningClick?: () => void
}

export default function Hero({ onStartPlanningClick }: HeroProps) {
  const [currentTripType, setCurrentTripType] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const tripTypes = [
    "boys trip",
    "girls trip", 
    "family vacation",
    "romantic getaway",
    "beach vacation",
    "nature retreat",
    "road trip",
    "ski trip",
    "adventure",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTripType((prev) => (prev + 1) % tripTypes.length)
        setIsAnimating(false)
      }, 300)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-[1200px] h-[500px] mx-auto relative mt-4">
      {/* Hero Background with Text */}
      <div 
        className="flex w-[1200px] h-[500px] items-center rounded-[30px] absolute left-0 top-0"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), url('/1.png') lightgray 50% / cover no-repeat`
        }}
      >
        <div className="absolute left-[100px] top-[120px] w-[500px]">
          <div className="flex flex-col items-start gap-8">
            <h1 className="text-white text-6xl font-bold leading-tight" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
              <span className="block">Plan your next</span>
              <span 
                className={`inline-block min-w-[600px] transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {tripTypes[currentTripType]}
              </span>
            </h1>
            <p className="text-white text-lg font-normal leading-relaxed" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
              Search destinations instantly or create detailed travel plans with your group
            </p>
            <div className="flex items-center">
              <button 
                onClick={onStartPlanningClick}
                className="flex h-14 px-10 py-4 justify-center items-center gap-2.5 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                  boxShadow: '0 8px 25px rgba(13, 148, 136, 0.3), 0 2px 8px rgba(13, 148, 136, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span 
                  className="text-xl font-semibold text-white" 
                  style={{ 
                    fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  Start Planning
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
