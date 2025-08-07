'use client'

import { Ship, Car, Bus } from 'lucide-react'

const features = [
  {
    icon: Ship,
    title: 'Real-Time Collaboration',
    subtitle: 'Book With Confidence',
    description: 'Our advanced booking system ensures real-time availability and instant confirmations, giving you peace of mind when planning your trip.'
  },
  {
    icon: Car,
    title: 'AI Powered',
    subtitle: 'Stress-free Experience',
    description: 'Leverage our AI-powered recommendations to discover the perfect destinations and experiences tailored to your preferences.'
  },
  {
    icon: Bus,
    title: 'Smart Decision Making',
    subtitle: 'Flexible Tour Options',
    description: 'Choose from a wide range of flexible tour options designed to match your travel style and budget requirements.'
  }
]

export default function Features() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-teal-100 rounded-xl">
                  <feature.icon className="h-8 w-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-teal-600 font-medium">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 