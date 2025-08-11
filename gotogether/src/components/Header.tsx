'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext'

interface HeaderProps {
  onSignupClick?: () => void
}

export default function Header({ onSignupClick }: HeaderProps) {
  const { user, signOut } = useSupabaseAuth()
  const isAuthenticated = !!user
  const [activeNav, setActiveNav] = useState('Home')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const handleTestBypass = async () => {
    // For now, just redirect to signup page
    window.location.href = '/auth/signup'
  }

  return (
    <header 
      className={`sticky z-50 transition-all duration-500 mx-8 ${scrollY > 0 ? 'top-7' : 'top-0'}`}
      style={{
        backdropFilter: 'blur(2px) saturate(110%)',
        WebkitBackdropFilter: 'blur(2px) saturate(110%)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: scrollY > 0 
          ? '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
          : 'none'
      }}
    >
      <div className="w-full px-[120px] py-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span 
              className="text-2xl font-bold text-gray-800 transition-all duration-500 group-hover:text-teal-600" 
              style={{ 
                fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              GoTogether
            </span>
            <svg 
              width="32" 
              height="24" 
              viewBox="0 0 32 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12"
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
              }}
            >
              <g clipPath="url(#clip0_5_34)">
                <path d="M31.9876 2.76562L28.5746 7.16516L29.878 10.9367L31.9876 2.76562Z" fill="url(#paint0_linear_5_34)"/>
                <path d="M32 2.76172L27.2676 5.72009L23.6113 4.07471L32 2.76172Z" fill="url(#paint1_linear_5_34)"/>
                <path d="M6.74142 21.8505C8.76363 23.2531 11.1714 24.0038 13.6378 24.0006C20.3101 24.0006 25.7192 18.6284 25.7192 12.0003C25.7183 11.2644 25.6496 10.5301 25.5142 9.80664C22.1648 14.2816 14.0379 23.7988 6.74142 21.8505Z" fill="url(#paint2_linear_5_34)"/>
                <path d="M25.0273 7.99509C24.1934 5.65681 22.6505 3.63261 20.611 2.20091C18.5715 0.7692 16.1355 0.000313362 13.6381 0C6.96583 0 1.55739 5.37217 1.55739 11.9997C1.55649 12.9115 1.66006 13.8205 1.86609 14.7091C0.951096 14.8483 -0.0015564 13.9247 -0.0015564 13.9247C0.572673 14.9985 1.42036 15.904 2.45693 16.5507L2.46928 16.582C2.87109 16.8213 3.29167 17.028 3.72693 17.2002C4.29311 17.4305 4.88418 17.5951 5.48839 17.6908C9.65833 18.4083 15.8984 16.5433 25.0273 7.99509Z" fill="url(#paint3_radial_5_34)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_5_34" x1="28.5746" y1="6.85118" x2="31.9876" y2="6.85118" gradientUnits="userSpaceOnUse">
                  <stop/>
                  <stop offset="0.71"/>
                  <stop offset="0.99"/>
                </linearGradient>
                <linearGradient id="paint1_linear_5_34" x1="23.6113" y1="4.24091" x2="32" y2="4.24091" gradientUnits="userSpaceOnUse">
                  <stop/>
                  <stop offset="0.65"/>
                  <stop offset="0.99"/>
                </linearGradient>
                <linearGradient id="paint2_linear_5_34" x1="6.74142" y1="16.9033" x2="25.7192" y2="16.9033" gradientUnits="userSpaceOnUse">
                  <stop offset="0.01"/>
                  <stop offset="0.57"/>
                  <stop offset="1"/>
                </linearGradient>
                <radialGradient id="paint3_radial_5_34" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.79609 9.2762) scale(22.663 22.511)">
                  <stop offset="0.01"/>
                  <stop offset="0.35"/>
                  <stop offset="1"/>
                </radialGradient>
                <clipPath id="clip0_5_34">
                  <rect width="32" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-start gap-12">
            <div className="flex items-start gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`text-xl font-normal text-gray-800 relative group transition-all duration-500 ${
                    activeNav === item.name ? 'font-bold' : 'hover:text-teal-600'
                  }`}
                  style={{ 
                    fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {item.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-500 ease-out ${
                      activeNav === item.name ? 'w-full bg-teal-600' : 'w-0 bg-teal-600 group-hover:w-full'
                    }`}
                    style={{
                      boxShadow: '0 0 8px rgba(20, 184, 166, 0.4)'
                    }}
                  ></span>
                </button>
              ))}
            </div>
            <Search 
              className="w-6 h-6 text-gray-800 hover:text-teal-600 hover:scale-110 transition-all duration-500 cursor-pointer" 
              strokeWidth={2}
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
              }}
            />
          </div>

          {/* Login/Signup */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-xl font-normal text-gray-800 hover:text-teal-600 transition-all duration-500" 
                  style={{ 
                    fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={signOut}
                  className="text-xl font-normal text-gray-800 hover:text-teal-600 transition-all duration-500" 
                  style={{ 
                    fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Test Bypass Button - Only visible in development */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={handleTestBypass}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    🧪 Test
                  </button>
                )}
                <Link 
                  href="/auth/login" 
                  className="text-xl font-normal text-gray-800 hover:text-teal-600 transition-all duration-500" 
                  style={{ 
                    fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  Log in
                </Link>
                <button 
                  onClick={onSignupClick}
                  className="flex h-10 px-6 py-1 justify-center items-center gap-2.5 rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span 
                    className="text-xl font-normal text-white" 
                    style={{ 
                      fontFamily: 'Golos Text, -apple-system, Roboto, Helvetica, sans-serif',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Sign up
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
