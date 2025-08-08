'use client'

import { Heart, Anchor } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black rounded-3xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Hot Air Balloon */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            
            {/* Center - Text */}
            <div className="text-center flex-1">
              <h3 className="text-xl font-medium mb-2">
                Don&apos;t Know Which Destination To Choose?
              </h3>
              <p className="text-3xl md:text-4xl font-bold">
                Call Us 
              </p>
            </div>
            
            {/* Right side - Sailboat */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Anchor className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 