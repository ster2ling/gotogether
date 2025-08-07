'use client'

import { Search, Globe } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-black" />
            <span className="text-xl font-bold text-black">GoTogether</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              How It Works
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              About Us
            </a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-black hover:text-gray-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-black hover:text-gray-600 transition-colors">
              Log in
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 