'use client'

import { Balloon } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black rounded-3xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Balloon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  Don't Know Which Destination To Choose?
                </h3>
                <p className="text-3xl md:text-4xl font-bold mt-2">
                  Call Us (858) 577-3477
                </p>
              </div>
            </div>
            
            <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 