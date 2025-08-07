'use client'

import { MessageCircle } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black mb-12">
          What our users say
        </h2>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          {/* Profile Picture */}
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full mx-auto relative">
              <div className="absolute -top-2 -right-2 bg-black text-white p-2 rounded-full">
                <MessageCircle className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Name */}
          <h3 className="text-xl font-bold text-black mb-4">
            Kristin Krause
          </h3>
          
          {/* Quote */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            "GoTogether made planning our family vacation incredibly easy. The AI recommendations were spot-on, and the booking process was seamless. We discovered amazing destinations we never would have considered. The customer service was exceptional throughout our entire journey. Highly recommend!"
          </p>
          
          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 