'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentText, setCurrentText] = useState(0)
  const texts = ['adventure', 'journey', 'experience', 'vacation']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <section className="relative h-[500px] bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl mx-4 mt-8 mb-8 overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 600\"%3E%3Crect width=\"1200\" height=\"600\" fill=\"%2306b6d4\"/%3E%3C/svg%3E')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Plan your next{' '}
          <span className="inline-block min-w-[200px] text-center">
            {texts[currentText]}
          </span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl opacity-90">
          Discover amazing destinations and create unforgettable memories with our expert travel planning services.
        </p>
      </div>
    </section>
  )
} 