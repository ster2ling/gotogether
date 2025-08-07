'use client'

import { Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Travel Agency Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6" />
              <span className="text-xl font-bold">Travel Agency</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover the world with GoTogether. We specialize in creating unforgettable travel experiences tailored to your preferences and budget.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-bold mb-4">Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Egypt</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Turkey</a></li>
              <li><a href="#" className="hover:text-white transition-colors">USA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">France</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Greece</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Be Our Partner</a></li>
              <li><a href="#" className="hover:text-white transition-colors">F.A.Q</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>(008) 675-9403</p>
              <p>info@goout.com</p>
              <p>43 W. Wellington Road<br />Fairhope, AL 36532</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>©Copyright Travel Agency 2023. Design by Fromgary</p>
        </div>
      </div>
    </footer>
  )
} 